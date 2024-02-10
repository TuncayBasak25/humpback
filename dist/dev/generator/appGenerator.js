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
            const appGenerator = new AppGenerator(appFolder, !appFolderPath);
            appGenerator.startGeneration();
            return appGenerator;
        });
    }
    constructor(appFolder, root = false) {
        this.appFolder = appFolder;
        this.root = root;
        this.implementationList = [];
    }
    startGeneration() {
        return __awaiter(this, void 0, void 0, function* () {
            const baseFolder = yield file_system_1.Folder.open(__dirname, "..", "..", "..", "auto");
            yield this.humpbackFolder;
            yield this.modulesFolder;
            yield this.servicesFolder;
            baseFolder.openFile("controller").then(contFile => contFile.copy(this.appFolder.path, "controller.ts"));
            baseFolder.openFile("humpback").then(hbFile => hbFile.copy(this.appFolder.path, "humpback", "index.ts"));
            (yield this.servicesFolder).watcher.on("change", () => __awaiter(this, void 0, void 0, function* () {
                const hbFile = yield baseFolder.openFile("humpback", "index.ts");
                yield hbFile.copy(this.appFolder.path, "humpback", "index.ts");
                let imports = "";
                let implementation = "";
                for (const serviceFile of yield (yield this.servicesFolder).fileList) {
                    const serviceType = serviceFile.name.slice(0, 1).toUpperCase() + serviceFile.name.slice(-1);
                    implementation += `public readonly ${serviceFile.basename}: ${serviceType} = new ${serviceType}();\n`;
                    imports += `import { ${serviceType} } from "../services/${serviceFile.basename}";`;
                }
                const hbCopy = yield this.appFolder.openFile("humpback", "index");
                yield hbCopy.write((yield hbCopy.read()).replace("//imports//", imports).replace("//implementation//", implementation));
            }));
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
        return this.appFolder.openFile("controller.ts");
    }
    get humpbackFile() {
        return this.appFolder.openFile("humpback/index.ts");
    }
    get serverFile() {
        return this.appFolder.openFile("humpback/server.ts");
    }
}
exports.AppGenerator = AppGenerator;
