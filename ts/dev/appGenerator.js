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
function upperFirst(text) {
    const letters = text.split("");
    letters[0] = letters[0].toUpperCase();
    return letters.join("");
}
class AppGenerator {
    static new(appFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!AppGenerator.baseHB) {
                AppGenerator.baseHB = yield file_system_1.File.read(__dirname, "base", "humpback");
                AppGenerator.baseController = yield file_system_1.File.read(__dirname, "base", "controller");
            }
            if (!appFolder)
                appFolder = yield file_system_1.Folder.open(process.cwd(), "ts", "app");
            const appGenerator = new AppGenerator(appFolder);
            yield appGenerator.init();
            return appGenerator;
        });
    }
    constructor(folder) {
        this.folder = folder;
        this.implementationList = [];
        this.serviceImports = "";
        this.serviceImplementations = "";
    }
    get contollerFile() {
        if (this.$conrollerFile)
            return this.$conrollerFile;
        throw new Error("Controller file is not initiated: Controller: " + this.folder.name);
    }
    get hbFile() {
        if (this.$hbFile)
            return this.$hbFile;
        throw new Error("HB file is not initiated: HB of " + this.folder.name);
    }
    get routesFolder() {
        if (this.$routesFolder)
            return this.$routesFolder;
        throw new Error("Routes folder is not initiated: Routes folder of " + this.folder.name);
    }
    get servicesFolder() {
        if (this.$servicesFolder)
            return this.$servicesFolder;
        throw new Error("Services folder is not initiated: Services folder of " + this.folder.name);
    }
    get viewsFolder() {
        if (this.$viewsFolder)
            return this.$viewsFolder;
        throw new Error("Views folder is not initiated: Views folder of " + this.folder.name);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const conrollerFile = yield this.folder.hasFile("controller.ts");
            if (!conrollerFile) {
                this.$conrollerFile = yield this.folder.openFile("controller.ts");
                this.contollerFile.write(AppGenerator.baseController);
            }
            else {
                this.$conrollerFile = conrollerFile;
            }
            this.$hbFile = yield (yield this.folder.openFolder("humpback")).openFile("index.ts");
            this.hbFile.write(AppGenerator.baseHB);
            this.$routesFolder = yield this.folder.openFolder("routes");
            this.$servicesFolder = yield this.folder.openFolder("services");
            this.$viewsFolder = yield this.folder.openFolder("views");
            for (const subRouteFolder of yield this.routesFolder.folderList) {
                yield AppGenerator.new(subRouteFolder);
            }
            this.generateRoutes();
            this.generateServices();
        });
    }
    generateHB() {
        return __awaiter(this, void 0, void 0, function* () {
            const imports = this.serviceImports;
            const implementations = this.serviceImplementations;
            yield this.hbFile.write(AppGenerator.baseHB.replace("//imports//", imports).replace("//implementations//", implementations));
        });
    }
    generateRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const subRouteFolder of yield this.routesFolder.folderList) {
                if (!(yield subRouteFolder.hasFile("controller.ts"))) {
                    yield AppGenerator.new(subRouteFolder);
                }
            }
        });
    }
    generateServices() {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceList = [];
            for (const entry of yield this.servicesFolder.entryList) {
                if (entry instanceof file_system_1.File)
                    serviceList.push(entry.basename);
                else
                    serviceList.push(entry.name);
            }
            this.serviceImports = "";
            this.serviceImplementations = "";
            for (const serviceName of serviceList) {
                const serviceType = upperFirst(serviceName);
                this.serviceImports += `import { ${serviceType} } from "../services/${serviceName}";`;
                this.serviceImplementations += `public readonly ${serviceName}: ${serviceType} = new ${serviceType}();\n`;
            }
            yield this.generateHB();
            this.servicesFolder.watcher.once("change", () => this.generateServices());
        });
    }
}
exports.AppGenerator = AppGenerator;
AppGenerator.baseHB = "";
AppGenerator.baseController = "";
