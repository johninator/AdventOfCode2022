import { DirectoryTreeReader } from "../reader/directory-tree-reader";

const reader = new DirectoryTreeReader('../inputs/input7.txt');
const tree = reader.read();

tree.printSizes();
console.log(tree.findDirsWithMaxSize(100000));
