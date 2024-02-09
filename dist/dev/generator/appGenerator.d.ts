import { File, Folder } from "file-system";
export declare class AppGenerator {
    readonly appFolder: Folder;
    readonly humpbackFolder: Folder;
    readonly moduleFolder: Folder;
    readonly serviceFolder: Folder;
    readonly controllerFile: File;
    static new(appFolderPath: string): Promise<AppGenerator>;
    implementationList: string[];
    private constructor();
    getImplementations(fileText: string): void;
}
//# sourceMappingURL=appGenerator.d.ts.map