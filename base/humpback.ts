import { Request, Response, NextFunction } from "express";

export class HB {
    
    public constructor(
        public req: Request,
        public res: Response,
        public next: NextFunction
    ) {
        (this as any)[req.method]();
    }

    protected GET() { this.res.send("404") }
    protected POST() { this.res.send("404") }
    protected PUT() { this.res.send("404") }
    protected DELETE() { this.res.send("404") }
    protected PATCH() { this.res.send("404") }
    protected UPDATE() { this.res.send("404") }
}