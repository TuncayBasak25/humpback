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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_1 = __importDefault(require("sleep"));
const appGenerator_1 = require("./generator/appGenerator");
const terminal_1 = __importDefault(require("terminal"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const appGenerator = yield appGenerator_1.AppGenerator.new();
        const compiler = new terminal_1.default();
        compiler.run("tsc -w");
        const nodemon = new terminal_1.default();
        nodemon.run("nodemon");
        while (true) {
            const input = prompt("Waiting your commad");
            console.log("You have written" + input);
            yield (0, sleep_1.default)(10);
        }
    });
})();
