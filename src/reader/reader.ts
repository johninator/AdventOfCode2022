import { readFileSync } from 'fs';

export abstract class Reader {
    constructor(public filename: string){
        this.filename = filename;
    }
    read(): any {
        return readFileSync(this.filename, 'utf-8');
    }
}

export type Numbers = number[];

export class NumbersReader extends Reader {
    read(): Numbers {
        const fileContent = readFileSync(this.filename, 'utf-8');
        const numbers = fileContent.split(/\r?\n/).map((value: string) => { return parseInt(value); });
        return numbers;
    }
}

export type NumbersArray = number[][];

export class NumbersArrayReader extends Reader {
    read(): NumbersArray {
        const fileContent = readFileSync(this.filename, 'utf-8');
        let numbersArray: NumbersArray = [];
        let numbers: Numbers = [];

        fileContent.split(/\r?\n/).forEach((value: string) => { 
            if (value === "") {
                numbersArray.push([...numbers]);
                numbers.splice(0);
                return;
            }
            numbers.push(parseInt(value));
        });
        
        return numbersArray;
    }
}

export interface Strings {
    strings: string[];
}

export class StringsReader extends Reader {
    read(): Strings {
        const fileContent = readFileSync(this.filename, 'utf-8');
        const strings = fileContent.split(/\r?\n/).map((value: string) => { return value; });
        return { strings };
    }
}
