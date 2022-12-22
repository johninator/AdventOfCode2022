import { Reader } from "./reader";

export interface IdRange {
    start: number;
    end: number;
};

export type IdRangePairs = Array<[IdRange, IdRange]>;

export class IdRangePairReader extends Reader {

    public read(): IdRangePairs {
        const fileContent = super.readBase();
        const idRangePairs: IdRangePairs = fileContent.split(/\r?\n/).map((value: string) => {
            const splits = value.split(',');
            const split0 = splits[0].split('-');
            const split1 = splits[1].split('-');
            const idRange1 = { start: parseInt(split0[0] || "0"), end: parseInt(split0[1] || "0") };
            const idRange2 = { start: parseInt(split1[0] || "0"), end: parseInt(split1[1] || "0") };
            return [idRange1, idRange2];
        });
        return idRangePairs
    }

}