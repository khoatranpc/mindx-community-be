export interface Obj {
    [k: string]: any;
}
export interface ResponseClient extends Obj {
    statusCode?: number;
    message: string;
}