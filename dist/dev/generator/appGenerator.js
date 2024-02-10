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
const file_generators_1 = require("./file-generators");
class AppGenerator {
    static new(appFolderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const appFolder = yield file_system_1.Folder.open(appFolderPath);
            const humpbackFolder = yield appFolder.openFolder("humpback");
            const moduleFolder = yield appFolder.openFolder("modules");
            const serviceFolder = yield appFolder.openFolder("services");
            const appGenerator = new AppGenerator(appFolder, humpbackFolder, moduleFolder, serviceFolder, yield (0, file_generators_1.routeFile)(appFolder));
            return appGenerator;
        });
    }
    constructor(appFolder, humpbackFolder, moduleFolder, serviceFolder, controllerFile) {
        this.appFolder = appFolder;
        this.humpbackFolder = humpbackFolder;
        this.moduleFolder = moduleFolder;
        this.serviceFolder = serviceFolder;
        this.controllerFile = controllerFile;
        this.implementationList = [];
    }
    getImplementations(fileText) {
    }
}
exports.AppGenerator = AppGenerator;
