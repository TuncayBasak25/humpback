import { File, Folder } from "file-system";


function upperFirst(text: string): string {
    const letters = text.split("");
    letters[0] = letters[0].toUpperCase();

    return letters.join("");
}


export class AppGenerator {

    private static baseHB: string = "";
    private static baseController: string = "";


    public static async new(appFolder?: Folder): Promise<AppGenerator> {

        if (!AppGenerator.baseHB) {
            AppGenerator.baseHB = await File.read(__dirname, "base", "humpback");
            AppGenerator.baseController = await File.read(__dirname, "base", "controller");
        }

        if (!appFolder) appFolder = await Folder.open(process.cwd(), "ts", "app");

        const appGenerator = new AppGenerator(appFolder);

        await appGenerator.init();

        return appGenerator;
    }

    public implementationList: string[] = [];

    private constructor(public readonly folder: Folder) {}

    //Make sure the right structure is in place

    private $conrollerFile?: File;
    private get contollerFile(): File {
        if (this.$conrollerFile) return this.$conrollerFile;

        throw new Error("Controller file is not initiated: Controller: " + this.folder.name);
    }

    private $hbFile?: File;
    private get hbFile(): File {
        if (this.$hbFile) return this.$hbFile;

        throw new Error("HB file is not initiated: HB of " + this.folder.name);
    }

    private $routesFolder?: Folder;
    private get routesFolder(): Folder {
        if (this.$routesFolder) return this.$routesFolder;

        throw new Error("Routes folder is not initiated: Routes folder of " + this.folder.name);
    }

    private $servicesFolder?: Folder;
    private get servicesFolder(): Folder {
        if (this.$servicesFolder) return this.$servicesFolder;

        throw new Error("Services folder is not initiated: Services folder of " + this.folder.name);
    }

    private $viewsFolder?: Folder;
    private get viewsFolder(): Folder {
        if (this.$viewsFolder) return this.$viewsFolder;

        throw new Error("Views folder is not initiated: Views folder of " + this.folder.name);
    }

    private async init() {
        const conrollerFile = await this.folder.hasFile("controller.ts");
        if (!conrollerFile) {
            this.$conrollerFile = await this.folder.openFile("controller.ts");

            this.contollerFile.write(AppGenerator.baseController);
        }
        else {
            this.$conrollerFile = conrollerFile;
        }

        this.$hbFile = await (await this.folder.openFolder("humpback")).openFile("index.ts");
        this.hbFile.write(AppGenerator.baseHB);

        this.$routesFolder = await this.folder.openFolder("routes");
        this.$servicesFolder = await this.folder.openFolder("services");
        this.$viewsFolder = await this.folder.openFolder("views");

        for (const subRouteFolder of await this.routesFolder.folderList) {
            await AppGenerator.new(subRouteFolder);
        }

        this.generateRoutes();
        this.generateServices();
    }


    private async generateHB() {
        const imports = this.serviceImports;
        const implementations = this.serviceImplementations;
        
        await this.hbFile.write(AppGenerator.baseHB.replace("//imports//", imports).replace("//implementations//", implementations));
    }

    private async generateRoutes() {
        for (const subRouteFolder of await this.routesFolder.folderList) {
            if (! await subRouteFolder.hasFile("controller.ts")) {
                await AppGenerator.new(subRouteFolder);
            }
        }
    }

    private serviceImports = "";
    private serviceImplementations = "";

    private async generateServices() {
        const serviceList = [];
        for (const entry of await this.servicesFolder.entryList) {
            if (entry instanceof File) serviceList.push(entry.basename);
            else serviceList.push(entry.name);
        }

        this.serviceImports = "";
        this.serviceImplementations = "";

        for (const serviceName of serviceList) {
            const serviceType = upperFirst(serviceName);

            this.serviceImports += `import { ${serviceType} } from "../services/${serviceName}";`;
            this.serviceImplementations += `public readonly ${serviceName}: ${serviceType} = new ${serviceType}();\n`;
        }

        await this.generateHB();

        this.servicesFolder.watcher.once("change", () => this.generateServices());
    }
}