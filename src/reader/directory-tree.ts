export interface Directory {
    name: string;
    root: boolean;
    parent: Directory | undefined;
    children: Directory[];
    sizeTotal: number;
    depth: number;
}

export class DirectoryTree {
    private root: Directory = {
        name: '/',
        root: true,
        parent: undefined,
        children: [],
        sizeTotal: 0,
        depth: 0
    };

    private currentDir: Directory | undefined = undefined;
    private currentDepth: number = 0;

    public changeDir(name: string): void {
        console.log('change dir to ' + name);
        if (!this.currentDir || name === '/') {
            this.currentDir = this.root;
            return;
        }
        const newDir = this.currentDir.children.find(
            (dir: Directory) => dir.name === name
        );
        if (newDir) {
            this.currentDir = newDir;
            this.currentDepth++;
            return;
        }
        throw new Error('directory not found');
    }

    public changeDirToParent(): void {
        if (this.currentDir && this.currentDir.parent) {
            console.log('change to parent dir ' + this.currentDir.parent.name);
            this.currentDir = this.currentDir.parent;
            this.currentDepth--;
        }
    }

    public addChild(childName: string): void {
        if (this.currentDir) {
            console.log(
                'add child ' + childName + ' to dir ' + this.currentDir.name
            );
            this.currentDir.children.push({
                name: childName,
                root: false,
                parent: this.currentDir,
                children: [],
                sizeTotal: 0,
                depth: this.currentDepth + 1
            });
        }
    }

    public setSize(size: number): void {
        if (this.currentDir) {
            this.currentDir.sizeTotal += size;
            this.propagateSize(this.currentDir, size);
        }
    }

    private propagateSize(dir: Directory, size: number): void {
        console.log('increment size of dir ' + dir.name + ' by ' + size);
        let dirCurrent = dir;
        while (dirCurrent.parent) {
            dirCurrent.parent.sizeTotal += size;
            dirCurrent = dirCurrent.parent;
        }
    }

    public findDirsWithMaxSize(maxSize: number): number {
        const dirs = this.findAllDirectories();
        const sumSizes = dirs.reduce<number>((total, dir) => {
                if (dir.sizeTotal <= maxSize) {
                    return total + dir.sizeTotal;
                }
                return total;
        }, 0);
        return sumSizes;
    }

    public printSizes(): void {
        const dirs = this.findAllDirectories();
        dirs.forEach(dir => {
            const indent = "-".repeat(dir.depth);
            console.log(indent + dir.name + ' has size ' + dir.sizeTotal);
        });
    }

    public getSizes(): number[] {
        return this.findAllDirectories().map(dir => dir.sizeTotal);
    }

    public findDirSizeWithMinSize(minSize: number): number {
        const dirs = this.findAllDirectories();
        return this.findClosestNumber(dirs.map(dir => dir.sizeTotal), minSize);
    }

    private findAllDirectories(): Directory[] {
        let dirCurrent: Directory | undefined = this.root;
        let dirsToBeSearched: Directory[] = [];
        const dirs: Directory[] = [];

        while (dirCurrent) {
            dirs.push(dirCurrent);
            dirsToBeSearched = [...dirsToBeSearched, ...dirCurrent.children];

            const dirPopped = dirsToBeSearched.pop();
            dirCurrent = dirPopped;
        }
        return dirs;
    }

    private findClosestNumber(numbers: number[], value: number): number {
        let closestNumber: number = 0;
        let closestDifference = Infinity;
      
        for (const number of numbers) {
          if (number >= value && Math.abs(number - value) < closestDifference) {
            closestNumber = number;
            closestDifference = Math.abs(number - value);
          }
        }
      
        return closestNumber;
      }
}
