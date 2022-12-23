import { Reader } from "./reader";

export interface Procedure {
    count: number;
    from: number;
    to: number;
};

export type CrateStack = Array<string[]>;

enum ReadMode {
    STACK = 0,
    PROCEDURE = 1
};

export class CrateReader extends Reader {

    private mode: ReadMode = ReadMode.STACK;

    public read(): [CrateStack, Procedure[]] {
        const fileContent = super.readBase();
        let crateStack: CrateStack = [];
        let procedures: Procedure[] = [];
        fileContent.split(/\r?\n/).forEach((value: string) => {


            if (value.length === 0) {
                this.mode = ReadMode.PROCEDURE;
                crateStack = crateStack.map((value) => {
                    return value.reverse();
                });
                return;
            }
            if (this.mode === ReadMode.STACK) {

                if (crateStack.length === 0) {
                    const stackLength = Math.ceil(value.length / 4);
                    crateStack = new Array<string[]>(stackLength);
                }

                const indices = [...value.matchAll(new RegExp('\\[', 'g'))].map(a => a.index);
                indices.forEach((index) => {
                    if (index === undefined) {
                        return;
                    }
                    const indexNew = Math.floor(index / 4);
                    if (!crateStack[indexNew]) {
                        crateStack[indexNew] = [];
                    }
                    crateStack[indexNew].push(value[index + 1]);
                })
            } else { // PROCEDURE mode
                const numbers = [...value.matchAll(new RegExp('\\d+', 'g'))].map(a => parseInt(a[0]));
                procedures.push({
                    count: numbers[0],
                    from: numbers[1] - 1,
                    to: numbers[2] - 1
                })
            }
        });
        return [crateStack, procedures];
    }



}