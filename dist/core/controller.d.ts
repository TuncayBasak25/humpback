import { Folder } from "file-system";
export declare class Controller {
    private sourceFolder;
    static create(sourceFolderPath: string): Promise<Controller>;
    constructor(sourceFolder: Folder);
}
//# sourceMappingURL=controller.d.ts.map