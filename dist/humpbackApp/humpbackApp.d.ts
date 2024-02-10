import { Application } from "express";
export declare const server: import("express-serve-static-core").Express;
export declare class HumpbackApp {
    static create({ port, callBack }: {
        port: string | number;
        callBack: () => void;
    }): Promise<void>;
    readonly expressServer: Application;
    private constructor();
    private setRouters;
}
//# sourceMappingURL=humpbackApp.d.ts.map