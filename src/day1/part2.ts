import { NumbersArrayReader, NumbersArray } from '../reader/reader';

const reader = new NumbersArrayReader('../inputs/input1.txt');
const numbersArray: NumbersArray = reader.read();

console.log(numbersArray);

function computeResult(numbersArray: NumbersArray): number {
    let sums: number[] = numbersArray.map((numbers: number[]) => {
        return numbers.reduce((sum, value) => {
            return sum + value;
        }, 0);
    });
    sums.sort((n1, n2) => n2 - n1);
    console.log(sums);
    return sums[0] + sums[1] + sums[2];
}
console.log(computeResult(numbersArray));
