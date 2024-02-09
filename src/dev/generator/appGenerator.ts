import { File, Folder } from "file-system";
import { routeFile } from "./file-generators";


export class AppGenerator {
    

    public static async new(appFolderPath: string): Promise<AppGenerator> {

        const appFolder = await Folder.open(appFolderPath);

        const humpbackFolder = await appFolder.openFolder("humpback");
        const moduleFolder = await appFolder.openFolder("modules");
        const serviceFolder = await appFolder.openFolder("services");

        const appGenerator = new AppGenerator(appFolder, humpbackFolder, moduleFolder, serviceFolder, await routeFile(appFolder));

        return appGenerator;
    }

    public implementationList: string[] = [];

    private constructor(
        public readonly appFolder: Folder,
        public readonly humpbackFolder: Folder,
        public readonly moduleFolder: Folder,
        public readonly serviceFolder: Folder,
        public readonly controllerFile: File
    ) {}

    getImplementations(fileText: string) {

    }
}