import { Request, Response, NextFunction } from "express";
export declare class HB {
    req: Request;
    res: Response;
    next: NextFunction;
    constructor(req: Request, res: Response, next: NextFunction);
    protected GET(): void;
    protected POST(): void;
    protected PUT(): void;
    protected DELETE(): void;
    protected PATCH(): void;
    protected UPDATE(): void;
}
//# sourceMappingURL=humpback.d.ts.map