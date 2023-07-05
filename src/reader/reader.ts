import { readFileSync } from 'fs';

export abstract class Reader {
    constructor(public filename: string){
        this.filename = filename;
    }
    readBase(): string {
        return readFileSync(this.filename, 'utf-8');
    }
}

export type Numbers = number[];

export class NumbersReader extends Reader {
    public read(): Numbers {
        const fileContent = super.readBase();
        const numbers = fileContent.split(/\r?\n/).map((value: string) => { return parseInt(value); });
        return numbers;
    }
}

export type NumbersArray = number[][];

export class NumbersArrayReader extends Reader {
    read(): NumbersArray {
        const fileContent = super.readBase();
        let numbersArray: NumbersArray = [];
        let numbers: Numbers = [];

        fileContent.split(/\r?\n/).forEach((value: string) => { 
            if (value === "") {
                numbersArray.push(numbers);
                numbers.splice(0);
                return;
            }
            numbers.push(parseInt(value));
        });
        
        return numbersArray;
    }
}


export type Strings = string[];

export class StringsReader extends Reader {
    read(): Strings {
        const fileContent = super.readBase();
        const strings = fileContent.split(/\r?\n/).map((value: string) => { return value; });
        return strings;
    }
}

export type StringPairs = [string, string][];

export class StringPairsReader extends Reader {
    read(): StringPairs {

        const fileContent = super.readBase();
        const stringPairs: StringPairs = [];

        fileContent.split(/\r?\n/).forEach((value: string) => { 
            stringPairs.push([value[0], value[2]]);
        });

        return stringPairs;
    }
}
