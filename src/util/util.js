// @flow

import difflib from 'difflib';
import fs from 'fs';

const DEFAULT_DIFF_INDENT = '  ';

export default class Util {
    static diff (from: string, to: string, diffIndent: string = DEFAULT_DIFF_INDENT): string {
        from.replace(/\r\n/g, '\n');
        to.replace(/\r\n/g, '\n');
        return difflib
            .unifiedDiff(from.split('\n'), to.split('\n'))
            .slice(2) // remove filenames
            .map(x => {
                return x.startsWith('@@') ? x : (x.substr(0, 1) + diffIndent + x.substr(1));
            })
            .map(x => {
                return x.endsWith('\n') ? x : (x + '\n');
            })
            .join('');
    }

    static toSnakeCase (str: string): string {
        const s = str
            .replace(/([A-Z])/g, (m, p1) => '_' + p1.toLowerCase())
            .replace('-', '_');
        return s.substr(0, 1) === '_' ? s.substr(1) : s;
    }

    static toCamelCase (str: string): string {
        return str.replace(/(_|-)([a-zA-Z])/g, (m, p1, p2) => p2.toUpperCase());
    }

    static toUpperCamelCase (str: string): string {
        const s = Util.toCamelCase(str);
        return s.substr(0, 1).toUpperCase() + s.substr(1);
    }

    static cpSync (src, dist): void {
        const tmp = fs.readFileSync(src);
        fs.writeFileSync(dist, tmp);
    }
}
