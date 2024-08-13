import { GraphQLError } from "graphql";
import { Obj } from "src/global/inteface";

interface Extensions extends Obj {
    statusCode: number;
}

export class GraphqlException extends GraphQLError{
    extensions: Obj;
    stack ?: string;
    message: string;
    constructor(extensions: Extensions, message: string, stack ?: string) {
        super(message);
        this.extensions = extensions;
        this.message = message;
        this.stack = stack;
    }
}