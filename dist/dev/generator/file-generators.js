"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeFile = void 0;
function routeFile(appFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield appFolder.openFile("route.ts");
        if ((yield file.read()) === "") {
            file.write(`
import { HB } from "./humback";

export class Home extends HB {

    get() {
        this.res.send("Hello");
    }
}
`);
        }
        return file;
    });
}
exports.routeFile = routeFile;
