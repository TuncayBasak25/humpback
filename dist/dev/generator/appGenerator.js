import { Folder } from "file-system";
import { routeFile } from "./file-generators";
export class AppGenerator {
    appFolder;
    humpbackFolder;
    moduleFolder;
    serviceFolder;
    controllerFile;
    static async new(appFolderPath) {
        const appFolder = await Folder.open(appFolderPath);
        const humpbackFolder = await appFolder.openFolder("humpback");
        const moduleFolder = await appFolder.openFolder("modules");
        const serviceFolder = await appFolder.openFolder("services");
        const appGenerator = new AppGenerator(appFolder, humpbackFolder, moduleFolder, serviceFolder, await routeFile(appFolder));
        return appGenerator;
    }
    implementationList = [];
    constructor(appFolder, humpbackFolder, moduleFolder, serviceFolder, controllerFile) {
        this.appFolder = appFolder;
        this.humpbackFolder = humpbackFolder;
        this.moduleFolder = moduleFolder;
        this.serviceFolder = serviceFolder;
        this.controllerFile = controllerFile;
    }
    getImplementations(fileText) {
    }
}
