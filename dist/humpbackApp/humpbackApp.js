"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.HumpbackApp = exports.server = void 0;
const express_1 = __importStar(require("express"));
const file_system_1 = require("file-system");
exports.server = (0, express_1.default)();
class HumpbackApp {
    static create({ port, callBack } = { port: process.env.PORT || 3000, callBack: () => console.log("Humpback app started.") }) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = new HumpbackApp();
            yield app.setRouters();
            while (true) {
                try {
                    app.expressServer.listen(port, callBack);
                    break;
                }
                catch (e) {
                    port++;
                }
            }
        });
    }
    constructor() {
        this.expressServer = (0, express_1.default)();
    }
    setRouters(router, appFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            appFolder = appFolder || (yield file_system_1.Folder.open(process.cwd(), "dist", "app"));
            const contFile = yield appFolder.hasFile("controller.js");
            if (!contFile)
                throw new Error("Controller file is missing! At server file of " + appFolder.name);
            const { Controller } = yield contFile.require();
            const myRouter = (0, express_1.Router)();
            for (const protoName of Object.getOwnPropertyNames(Controller.prototype)) {
                const text = protoName.toLocaleLowerCase();
                const match = text.match(/(all|get|post|put|patch|delete)/i);
                if (match && !match.index) {
                    const method = match[0];
                    const url = text.replace(match[0], "").replace(/\$/g, "/:").replace(/_/g, "/") || "/";
                    console.log(method, url);
                    myRouter[method](url, (...args) => new Controller(...args, protoName));
                }
            }
            (router || exports.server).use(router ? appFolder.name : "/", myRouter);
            const modulesFolder = yield appFolder.hasFolder("modules");
            if (!modulesFolder)
                return;
            for (const moduleFolder of yield modulesFolder.folderList)
                yield this.setRouters(myRouter, moduleFolder);
        });
    }
}
exports.HumpbackApp = HumpbackApp;
