import { NumbersArrayReader } from "../reader/reader";

const reader = new NumbersArrayReader("../inputs/input8.txt");
const treeMap = reader.readAllLines();

interface Tree {
    height: number;
    score: number;
}

enum Direction {
    up,
    down,
    left,
    right
}

const trees: Tree[][] = treeMap.map((line) => {
    return line.map((height) => ({
        height,
        score: 0
    }));
});

printTreeHeights(trees);
computeScenicScores(trees);
console.log(findHighestScoreTree(trees));

function findHighestScoreTree(trees: Tree[][]): Tree {
    let scoreMax = 0;
    let treeMax = trees[0][0];

    for(let row=0; row < trees.length; ++row) {
        for(let col=0; col < trees.length; ++col) {
            if (trees[row][col].score > scoreMax) {
                treeMax = trees[row][col];
                scoreMax = treeMax.score;
            }
        }
    }
    return treeMax;
}


function computeScenicScores(trees: Tree[][]): void {
    for(let row=0; row < trees.length; ++row) {
        for(let col=0; col < trees.length; ++col) {
            computeScenicScoreForTree(row, col, trees);
        }
    }
}

function computeScenicScoreForTree(row: number, col: number, trees: Tree[][]): void {
    const tree = trees[row][col];
    let score = 1;

    score *= computeViewingDistanceForTree(row, col, trees, Direction.up);
    score *= computeViewingDistanceForTree(row, col, trees, Direction.down);
    score *= computeViewingDistanceForTree(row, col, trees, Direction.left);
    score *= computeViewingDistanceForTree(row, col, trees, Direction.right);
    tree.score = score;
}

function computeViewingDistanceForTree(row: number, col: number, trees: Tree[][], direction: Direction): number {
    let distance = 0;
    const height = trees[row][col].height;
    let rowInc = 0;
    let colInc = 0;
    if (direction === Direction.up) {
        // console.log('up');
        rowInc = -1;
    } else if (direction === Direction.down) {
        // console.log('down');
        rowInc = 1;
    } else if (direction === Direction.left) {
        // console.log('left');
        colInc = -1;
    } else if (direction === Direction.right) {
        // console.log('right');
        colInc = 1;
    }

    let rowIdx = row + rowInc;
    let colIdx = col + colInc;

    // console.log(height, rowInc, colInc, rowIdx, colIdx);

    while (rowIdx >= 0 && colIdx >= 0 && rowIdx < trees.length && colIdx < trees.length) {
        // console.log(trees[rowIdx][colIdx].height);

        ++distance;
        if (trees[rowIdx][colIdx].height >= height) {
            break;
        }
    
        rowIdx += rowInc;
        colIdx += colInc;
    }
    // console.log(distance);
    return distance;

}



function printTreeHeights(trees: Tree[][]): void {
    trees.forEach((line) => console.log(line.map((tree) => tree.height)));
}


