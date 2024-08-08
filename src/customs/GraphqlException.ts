import { Obj } from "src/global/inteface";

interface Extensions extends Obj {
    statusCode: number;
}

export class GraphqlException {
    extendtions: Obj;
    stack?: string;
    message: string;
    constructor(extendtions: Extensions, message: string, stack?: string) {
        this.extendtions = extendtions;
        this.message = message;
        this.stack = stack;
    }
}