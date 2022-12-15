import { StringsReader, Strings } from '../reader/reader';

const reader = new StringsReader('../inputs/input3.txt');
const strings: Strings = reader.read();

console.log(computeResult(strings));

function computeResult(strings: Strings): number {
    let sum = 0;
    for (let i = 0; i < strings.length; ) {
        const priority = getPriority(findOverlap(strings[i], strings[i + 1], strings[i + 2]));
        sum += priority;
        i += 3;
    }
    return sum;
}

function findOverlap(slice1: string, slice2: string, slice3: string): string {
    for (let i = 0; i < slice1.length; i++) {
        if (slice2.includes(slice1[i]) && slice3.includes(slice1[i])) {
            return slice1[i];
        }
    }
    return '';
}

function getPriority(char: string): number {
    if (char === char.toUpperCase()) {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}
