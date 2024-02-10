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
exports.AppGenerator = void 0;
const file_system_1 = require("file-system");
class AppGenerator {
    static new(appFolderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const appFolder = yield (appFolderPath ? file_system_1.Folder.open(appFolderPath) : file_system_1.Folder.open(process.cwd(), "src", "app"));
            const appGenerator = new AppGenerator(appFolder);
            appGenerator.startGeneration();
            return appGenerator;
        });
    }
    constructor(appFolder) {
        this.appFolder = appFolder;
        this.implementationList = [];
    }
    startGeneration() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.humpbackFolder;
            this.generateRouterFile();
            this.generateHumpbackFile();
        });
    }
    get humpbackFolder() {
        return this.appFolder.openFolder("humpback");
    }
    get modulesFolder() {
        return this.appFolder.openFolder("modules");
    }
    get servicesFolder() {
        return this.appFolder.openFolder("services");
    }
    get routerFile() {
        return this.appFolder.openFile("router.ts");
    }
    get humpbackFile() {
        return this.appFolder.openFile("humpback/router.ts");
    }
    generateRouterFile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.routerFile).write(`
import { HB } from "./humback";

export class Home extends HB {

    get() {
        this.res.send("Hello");
    }
}
`);
        });
    }
    generateHumpbackFile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.humpbackFile).write(`

import { Request, Response, NextFunction } from "express";

export class HB {
    
    public constructor(
        public method: "all" | "get" | "put" | "post" | "patch" | "delete"
        public req: Request,
        public res: Response,
        public next: NextFunction
    ) {
        (this as any)[this.method]();
    }
}
`);
        });
    }
}
exports.AppGenerator = AppGenerator;
