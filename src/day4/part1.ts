import { IdRangePairReader, IdRangePairs, IdRange } from "../reader/id-range-pair-reader";

const reader = new IdRangePairReader('../inputs/input4.txt');
const idRangePairs: IdRangePairs = reader.read();

console.log(computeResult(idRangePairs));

function computeResult(idRangePairs: IdRangePairs): number {
    let count = idRangePairs.reduce((acc, curr) => {
        const contained = checkIfContains(curr[0], curr[1]) || checkIfContains(curr[1], curr[0]);
        return acc + (contained ? 1 : 0);
    }, 0);
    return count;
}

function checkIfContains(range1: IdRange, range2: IdRange): boolean {
    return range2.start >= range1.start && range2.end <= range1.end;
}

