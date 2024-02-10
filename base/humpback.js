"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HB = void 0;
class HB {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this[req.method]();
    }
    GET() { this.res.send("404"); }
    POST() { this.res.send("404"); }
    PUT() { this.res.send("404"); }
    DELETE() { this.res.send("404"); }
    PATCH() { this.res.send("404"); }
    UPDATE() { this.res.send("404"); }
}
exports.HB = HB;
