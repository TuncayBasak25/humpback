import express, { Application, Router, Request, Response, NextFunction } from "express";
import { Folder } from "file-system";

export const server = express();

setRouters(server).then(() => {
    server.listen(3000);
});

async function setRouters(router?: Router, appFolder?: Folder) {
    appFolder = appFolder || await Folder.open(process.cwd(), "src", "app");

    const contFile = await appFolder.hasFile("controller.ts");

    if (!contFile) throw new Error("Controller file is missing! At server file of " + appFolder.name);

    const { Controller } = await contFile.require();

    const myRouter = Router();

    myRouter.use((req: Request, res: Response, next: NextFunction) => new Controller(req, res, next));

    (router || server).use(router ? appFolder.name : "/", myRouter);

    const modulesFolder = await appFolder.hasFolder("modules");

    if (!modulesFolder) return;
    
    for (moduleFolder of await modulesFolder.folderList) setRouters(myRouter, moduleFolder);
}
