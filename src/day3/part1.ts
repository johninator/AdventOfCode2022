import {StringsReader, Strings} from '../reader/reader';

const reader = new StringsReader('../inputs/input3.txt');
const strings: Strings = reader.read();

console.log(computeResult(strings));


function computeResult(strings: Strings ): number {
    let sum = 0;
    strings.forEach((input) => {
        const [slice1, slice2] = sliceString(input);
        const priority = getPriority(findOverlap(slice1, slice2)); 
        sum += priority;
    });
    return sum;
}

function sliceString(input: string): [string, string] {
    return [input.slice(0, input.length / 2), input.slice(input.length / 2)];
}

function findOverlap(slice1: string, slice2: string): string {
    for (let i = 0; i < slice1.length; i++) {
        if (slice2.includes(slice1[i])) {
            return slice1[i];
        }
    }
    return "";
}

function getPriority(char: string): number {
    if (char === char.toUpperCase()) {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

