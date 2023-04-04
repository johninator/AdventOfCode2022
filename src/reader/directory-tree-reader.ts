import { DirectoryTree } from './directory-tree';
import { Reader } from './reader';

export class DirectoryTreeReader extends Reader {
    read(): DirectoryTree {
        const fileContent = super.readBase();
        const strings = fileContent.split(/\r?\n/).map((value: string) => {
            return value;
        });
        let tree: DirectoryTree = new DirectoryTree();
        let sumSizes = 0;

        strings.forEach((value) => {

            if (value.startsWith('$ cd')) {
                tree.setSize(sumSizes);

                if (value === '$ cd ..') {
                    tree.changeDirToParent();
                    return;
                }
                sumSizes = 0;
                const dirName = value.substring(5);
                tree.changeDir(dirName);
            }
            if (value.startsWith('$ ls')) {
                return;
            }
            if (value.startsWith('dir')) {
                const childName = value.substring(4);
                tree.addChild(childName);
            }
            if (parseInt(value.split(' ')[0])) {
                sumSizes += parseInt(value.split(' ')[0]);
            }
        });

        tree.setSize(sumSizes);

        return tree;
    }
}
