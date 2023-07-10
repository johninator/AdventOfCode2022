import { NumbersArrayReader } from "../reader/reader";

const reader = new NumbersArrayReader("../inputs/input8.txt");
const treeMap = reader.readAllLines();

interface Tree {
    height: number;
    visible: boolean;
}

const trees: Tree[][] = treeMap.map((line) => {
    return line.map((height) => ({
        height,
        visible: false
    }));
});

// printTreeHeights(trees);

trees.forEach((line) => findVisibleTreesAlongLine(line));
trees.forEach((line) => findVisibleTreesAlongLine(line.reverse()));

const treesTransposed = transposeTrees(trees);
treesTransposed.forEach((line) => findVisibleTreesAlongLine(line));
treesTransposed.forEach((line) => findVisibleTreesAlongLine(line.reverse()));

console.log(countVisibleTrees(treesTransposed));

function countVisibleTrees(trees: Tree[][]): number {
    return trees.reduce<number>((total, line) => {
        return total + countVisibleTreesInLine(line);
    }, 0);
}

function countVisibleTreesInLine(line: Tree[]): number {
    return line.reduce<number>((total, tree) => {
        return total + (tree.visible ? 1 : 0);
    }, 0);
}

function findVisibleTreesAlongLine(line: Tree[]): void {
    let heightMax = -1;
    for(let idx=0; idx < line.length; ++idx) {
        if (line[idx].height > heightMax) {
            heightMax = line[idx].height;
            line[idx].visible = true;
        }
    }
}

function transposeTrees(trees: Tree[][]): Tree[][] {
    const treesTranposed: Tree[][] = [];
    for (let col=0; col < trees.length; ++col) {
        const treeLine: Tree[] = [];
        for (let row=0; row < trees.length; ++row) {
            treeLine.push(trees[row][col]);
        }
        treesTranposed.push(treeLine);
    }
    return treesTranposed;
}

function printTreeHeights(trees: Tree[][]): void {
    trees.forEach((line) => console.log(line.map((tree) => tree.height)));
}


