import { File, Folder } from "file-system";

async function routeFile(appFolder: Folder): Promise<File> {
    const file = await appFolder.openFile("route.ts");

    if (await file.read() === "") {
        file.write(`
import { HB } from "./humback";

export class Home extends HB {

    get() {
        this.res.send("Hello");
    }
}
`);
    }

    return file;
}


export {
    routeFile
}