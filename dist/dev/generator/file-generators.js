async function routeFile(appFolder) {
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
export { routeFile };
