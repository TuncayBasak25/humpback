import { File, Folder } from "file-system";


export class AppGenerator {

    public static async new(appFolderPath?: string): Promise<AppGenerator> {

        const appFolder = await (appFolderPath ? Folder.open(appFolderPath) : Folder.open(process.cwd(), "src", "app"));

        const appGenerator = new AppGenerator(appFolder, !appFolderPath);

        appGenerator.startGeneration();

        return appGenerator;
    }

    public implementationList: string[] = [];

    private constructor(public readonly appFolder: Folder, public readonly root: boolean = false) {}

    private async startGeneration() {
        const baseFolder = await Folder.open(__dirname, "..", "..", "..", "auto");

        await this.humpbackFolder;
        await this.modulesFolder;
        await this.servicesFolder;

        baseFolder.openFile("controller").then(contFile => contFile.copy(this.appFolder.path, "controller.ts"));

        baseFolder.openFile("humpback").then(hbFile => hbFile.copy(this.appFolder.path, "humpback", "index.ts"));

        if (this.root) baseFolder.openFile("server").then(sFile => sFile.copy(this.appFolder.path, "humpback", "server.ts"));
    }

    public get humpbackFolder(): Promise<Folder> {
        return this.appFolder.openFolder("humpback");
    }

    public get modulesFolder(): Promise<Folder> {
        return this.appFolder.openFolder("modules");
    }

    public get servicesFolder(): Promise<Folder> {
        return this.appFolder.openFolder("services");
    }

    public get routerFile(): Promise<File> {
        return this.appFolder.openFile("controller.ts");
    }

    public get humpbackFile(): Promise<File> {
        return this.appFolder.openFile("humpback/index.ts");
    }

    public get serverFile(): Promise<File> {
        return this.appFolder.openFile("humpback/server.ts");
    }
}