import { CrateReader, CrateStack, Procedure } from "../reader/crate-reader";

const reader = new CrateReader('../inputs/input5.txt');
const [crateStack, procedures] = reader.read();

computeResult();

function computeResult() {
    procedures.forEach((procedure) => {
        applyProcedure(procedure);
    });
    let finalString: string = "";
    crateStack.forEach((value) => {
        finalString = finalString + value[value.length - 1].charAt(0);
     });
    console.log(finalString);
}

function applyProcedure(procedure: Procedure) {
    let stackTemp: string[] = [];
    for (let i = 0; i < procedure.count; ++i) {
        stackTemp.push(crateStack[procedure.from].pop() || "");
    }
    crateStack[procedure.to] = [...crateStack[procedure.to], ...stackTemp.reverse()];
}
