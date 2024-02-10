"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const humpback_1 = require("./humpback");
class Controller extends humpback_1.HB {
    GET() {
        this.res.send("Hello");
    }
}
exports.Controller = Controller;
