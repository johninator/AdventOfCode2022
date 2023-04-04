export interface Directory {
    name: string;
    root: boolean;
    parent: Directory | undefined;
    children: Directory[];
    sizeLocal: number;
    sizeTotal: number;
}

export class DirectoryTree {
    private root: Directory = {
        name: '/',
        root: true,
        parent: undefined,
        children: [],
        sizeLocal: 0,
        sizeTotal: 0
    };

    private currentDir: Directory | undefined = undefined;

    public changeDir(name: string): void {
        console.log('change dir to ' + name);
        if (!this.currentDir) {
            this.currentDir = this.root;
            return;
        }
        const newDir = this.currentDir.children.find(
            (dir: Directory) => dir.name === name
        );
        if (newDir) {
            this.currentDir = newDir;
            return;
        }
        throw new Error('directory not found');
    }

    public changeDirToParent() {
        if (this.currentDir && this.currentDir.parent) {
            this.currentDir = this.currentDir.parent;
        }
    }

    public addChild(childName: string): void {
        if (this.currentDir) {
            this.currentDir.children.push({
                name: childName,
                root: false,
                parent: this.currentDir,
                children: [],
                sizeLocal: 0,
                sizeTotal: 0
            });
        }
    }

    public setSize(size: number): void {
        if (this.currentDir && this.currentDir.sizeLocal === 0) {
            this.currentDir.sizeLocal = size;
            this.currentDir.sizeTotal = size;
            this.propagateSize(this.currentDir);
        }
    }

    private propagateSize(dir: Directory): void {
        const size = dir.sizeLocal;
        let dirCurrent = dir;
        while (dirCurrent.parent) {
            dirCurrent.parent.sizeTotal += size;
            dirCurrent = dirCurrent.parent;
        }
    }

    // public search(nameFinal: string): Directory | undefined {
    //     let dirCurrent: Directory = this.root;
    //     let dirsToBeSearched = this.root.children;

    //     while (dirCurrent.name !== nameFinal) {
    //         dirsToBeSearched = [...dirsToBeSearched, ...dirCurrent.children];
    //         let dirPopped = dirsToBeSearched.pop();
    //         if (dirPopped) {
    //             dirCurrent = dirPopped;
    //             continue;
    //         }
    //         return undefined;
    //     }
    //     return dirCurrent;
    // }

    public findDirsWithMaxSize(maxSize: number): number {
        let dirCurrent: Directory = this.root;
        let dirsToBeSearched = this.root.children;
        let sumSizes = 0;

        while (dirsToBeSearched.length > 0) {
            const size  = dirCurrent.sizeTotal;
            if (size <= maxSize) {
                console.log('take ' + dirCurrent.name + ' with size ' + size)
                sumSizes += size;
            }
            dirsToBeSearched = [...dirsToBeSearched, ...dirCurrent.children];
            let dirPopped = dirsToBeSearched.pop();

            if (dirPopped) {
                dirCurrent = dirPopped;
            }
        }
        return sumSizes;
    }

    public printSizes(): void {
        let dirCurrent: Directory = this.root;
        let dirsToBeSearched = this.root.children;

        while (dirsToBeSearched.length > 0) {
            console.log(dirCurrent.name + ' has size ' + dirCurrent.sizeTotal);
            dirsToBeSearched = [...dirsToBeSearched, ...dirCurrent.children];
            let dirPopped = dirsToBeSearched.pop();
            if (dirPopped) {
                dirCurrent = dirPopped;
            }
        }
    }
}
