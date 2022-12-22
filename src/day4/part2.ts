import { IdRangePairReader, IdRangePairs, IdRange } from "../reader/id-range-pair-reader";

const reader = new IdRangePairReader('../inputs/input4.txt');
const idRangePairs: IdRangePairs = reader.read();

console.log(computeResult(idRangePairs));

function computeResult(idRangePairs: IdRangePairs): number {
    let count = idRangePairs.reduce((acc, curr) => {
        const contained = checkIfOverlaps(curr[0], curr[1]);
        return acc + (contained ? 1 : 0);
    }, 0);
    return count;
}

function checkIfOverlaps(range1: IdRange, range2: IdRange): boolean {
    return range2.start <= range1.end && range1.start <= range2.end;
}

