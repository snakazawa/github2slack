// @flow

import difflib from 'difflib';

const DEFAULT_DIFF_INDENT = '  ';

export default class Util {
    static diff (to: string, from: string, diffIndent: string = DEFAULT_DIFF_INDENT): string {
        to.replace(/\r\n/g, '\n');
        from.replace(/\r\n/g, '\n');
        return difflib
            .unifiedDiff(to.split('\n'), from.split('\n'))
            .slice(2) // remove filenames
            .map(x => {
                return x.startsWith('@@') ? x : (x.substr(0, 1) + diffIndent + x.substr(1));
            })
            .map(x => {
                return x.endsWith('\n') ? x : (x + '\n');
            })
            .join('');
    }
}
