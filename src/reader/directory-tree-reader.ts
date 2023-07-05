import { DirectoryTree } from './directory-tree';
import { Reader } from './reader';

export class DirectoryTreeReader extends Reader {
    read(): DirectoryTree {
        const fileContent = super.readBase();
        const strings = fileContent.split(/\r?\n/).map((value: string) => {
            return value;
        });
        const tree: DirectoryTree = new DirectoryTree();

        strings.forEach((value) => {
            if (value.startsWith('$ cd')) {
                if (value === '$ cd ..') {
                    tree.changeDirToParent();
                    return;
                }

                const dirName = value.substring(5);
                tree.changeDir(dirName);
            }
            else if (value.startsWith('dir')) {
                const childName = value.substring(4);
                tree.addChild(childName);
            }
            else if (parseInt(value.split(' ')[0])) {
                tree.setSize(parseInt(value.split(' ')[0]));
            }
        });

        return tree;
    }
}
