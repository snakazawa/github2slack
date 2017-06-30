// @flow

let count: number = 0;

export default function counter (): number {
    count += 1;
    return count;
}
