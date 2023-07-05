import { DirectoryTreeReader } from "../reader/directory-tree-reader";

const reader = new DirectoryTreeReader('../inputs/input7.txt');
const tree = reader.read();

const sizes = tree.getSizes();
const sizeRoot = sizes[0];
const sizeLeft = 70000000 - sizeRoot;
const sizeToFree = 30000000 - sizeLeft;
const sizeDirToDelete = tree.findDirSizeWithMinSize(sizeToFree);
console.log(sizeDirToDelete);
