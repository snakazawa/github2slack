// @flow

import path from 'path';
import fs from 'fs';
import commander from 'commander';
import Util from '../src/util/util';

const { toSnakeCase, toUpperCamelCase, cpSync } = Util;

const SERIALIZER_DIR = path.join(__dirname, '..', 'src', 'serializer');
const TEMPLATE_PATH = path.join(__dirname, 'template', 'serializer_package');
const CUSTOM_TEMPLATE_PATH = path.join(__dirname, 'template', 'custom_serializer_package');
const DEFINE_PACKAGES_PATH = path.join(__dirname, '..', 'src', 'serializer', 'serializer_packages.js');

console.assert(fs.existsSync(SERIALIZER_DIR), 'assertion failed: SERIALIZER_DIR was not found');
console.assert(fs.existsSync(TEMPLATE_PATH), 'assertion failed: TEMPLATE_PATH was not found');
console.assert(fs.existsSync(CUSTOM_TEMPLATE_PATH), 'assertion failed: CUSTOM_TEMPLATE_PATH was not found');
console.assert(fs.existsSync(DEFINE_PACKAGES_PATH), 'assertion failed: DEFINE_PACKAGES_PATH was not found');

commander
    .option('-n, --name [name]', 'New serializer package name (require)')
    .option('-c, --custom', 'Create full custom serializer package (default: false)')
    .option('--force', '**danger** Fource generation (default: false)')
    .parse(process.argv);

const {name: packageName, custom: enabledCustom, force: enabledForce} = commander;

if (typeof packageName !== 'string') {
    console.error(commander.helpInformation());
    process.exit(1);
}

const packagePath = path.join(SERIALIZER_DIR, toSnakeCase(packageName));

const templatePath = enabledCustom ? CUSTOM_TEMPLATE_PATH : TEMPLATE_PATH;

// generate

if (fs.existsSync(packagePath)) {
    if (enabledForce) {
        console.log(`skip mkdir ${packagePath}`);
    } else {
        console.error(`${packageName} is already exists: ${packagePath}`);
        process.exit(1);
    }
} else {
    console.log(`mkdir ${packagePath}`);
    fs.mkdirSync(packagePath);
}

const filenames = fs.readdirSync(templatePath);

for (let filename of filenames) {
    const src = path.join(templatePath, filename);
    const dist = path.join(packagePath, filename);
    console.log(`cp ${src} ${dist}`);
    cpSync(src, dist);
}

console.log(`update ${DEFINE_PACKAGES_PATH}`);
const serializers = fs
    .readdirSync(SERIALIZER_DIR)
    .filter(filename => fs.statSync(path.join(SERIALIZER_DIR, filename)).isDirectory())
    .map(x => ({
        snake: toSnakeCase(x),
        upper: toUpperCamelCase(x)
    }));
const defineTest = [
    '// @flow',
    '',
    serializers.map(({snake, upper}) => `import ${upper} from './${snake}';`).join('\n'),
    '',
    'export default {',
    serializers.map(({upper}) => `    ${upper}: ${upper}`).join(',\n'),
    '};',
    ''
].join('\n');
fs.writeFileSync(DEFINE_PACKAGES_PATH, defineTest);

console.log('Completed!\n');
console.log('Please update SERIALIZER environment (on .env) if you use new serialize package.');
