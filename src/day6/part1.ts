import { StringsReader } from "../reader/reader";

const reader = new StringsReader('../inputs/input6.txt');
const strings = reader.read();
const code = strings[0];

computeResult(code);

function computeResult(code: string): void {
    const len = 4; 
    for (let i = 0; i < code.length; ++i) {
            if (checkCodeAt(code, i, len)) {
                console.log(i + len);
                return;
            }
    }
}

function checkCodeAt(code: string, position: number, length: number): boolean {
    let set = new Set<string>;
    for (let i = position; i < position + length; ++i) {
        if (set.has(code[i])) {
            return false;
        }
        set.add(code[i]);
    }
    console.log(set);
    return true;
}
