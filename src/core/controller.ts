import { Folder } from "file-system"

export class Controller {

    static async create(sourceFolderPath: string): Promise<Controller> {
        const sourceFolder = await Folder.open(sourceFolderPath);

        const controller = new Controller(sourceFolder);

        return controller;
    }

    constructor(private sourceFolder: Folder) {}

}