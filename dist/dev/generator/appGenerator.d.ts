import { File, Folder } from "file-system";
export declare class AppGenerator {
    readonly appFolder: Folder;
    static new(appFolderPath?: string): Promise<AppGenerator>;
    implementationList: string[];
    private constructor();
    private startGeneration;
    get humpbackFolder(): Promise<Folder>;
    get modulesFolder(): Promise<Folder>;
    get servicesFolder(): Promise<Folder>;
    get routerFile(): Promise<File>;
    get humpbackFile(): Promise<File>;
    generateRouterFile(): Promise<void>;
    generateHumpbackFile(): Promise<void>;
}
//# sourceMappingURL=appGenerator.d.ts.map