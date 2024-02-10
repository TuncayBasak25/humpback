import { File, Folder } from "file-system";


export class AppGenerator {
    

    public static async new(appFolderPath?: string): Promise<AppGenerator> {

        const appFolder = await (appFolderPath ? Folder.open(appFolderPath) : Folder.open(process.cwd(), "src", "app"));

        const appGenerator = new AppGenerator(appFolder);

        appGenerator.startGeneration();

        return appGenerator;
    }

    public implementationList: string[] = [];

    private constructor(public readonly appFolder: Folder) {}

    private async startGeneration() {
        await this.humpbackFolder;

        this.generateRouterFile();

        this.generateHumpbackFile();  
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
        return this.appFolder.openFile("router.ts");
    }

    public get humpbackFile(): Promise<File> {
        return this.appFolder.openFile("humpback/index.ts");
    }


    async generateRouterFile() {
        await (await this.routerFile).write(`
import { HB } from "./humpback";

export class Home extends HB {

    get() {
        this.res.send("Hello");
    }
}
`);
    }

    async generateHumpbackFile() {
        await (await this.humpbackFile).write(`

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
    }
}