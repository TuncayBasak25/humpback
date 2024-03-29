import bodyParser from "body-parser";
import { IController } from "./interfaces/controller";

import express, { Application, Router } from "express";
import { Folder } from "file-system";

export {
    IController,
}

type HTTPMethod = "all" | "get" | "post" | "put" | "patch" | "delete";

export default class HumpbackApp {

    static async create(
        { port, callBack }:
        { port: string | number, callBack: () => void } =
        { port: process.env.PORT || 3000, callBack: () => console.log("Humpback app started.") }): Promise<HumpbackApp> {
        const app = new HumpbackApp();

        app.expressServer.use(bodyParser.json());
        app.expressServer.use(bodyParser.urlencoded({ extended: true }));

        await app.setRouters();

        while (true) {
            try {
                app.expressServer.listen(port, callBack);

                break;
            }
            catch (e) {
                (port as number)++;
            }
        }

        return app;
    }

    public readonly expressServer: Application = express();
    private constructor() { }

    private async setRouters(router?: Router, appFolder?: Folder) {
        appFolder = appFolder || await Folder.open(process.cwd(), "ts", "app");

        const contFile = await appFolder.hasFile("controller.js");

        if (!contFile) throw new Error("Controller file is missing! At server file of " + appFolder.name);

        const { Controller } = await contFile.require();

        const myRouter = Router();

        for (const protoName of Object.getOwnPropertyNames(Controller.prototype)) {

            const text = protoName.toLocaleLowerCase();

            const match = text.match(/(all|get|post|put|patch|delete)/i);

            if (match && !match.index) {
                const method = match[0] as HTTPMethod;
                const url = text.replace(match[0], "").replace(/\$/g, "/:").replace(/_/g, "/") || "/";

                myRouter[method](url, (...args: any[]) => new Controller(...args, protoName));
            }
        }


        (router || this.expressServer).use(router ? "/" + appFolder.name : "/", myRouter);

        const modulesFolder = await appFolder.hasFolder("routes");

        if (!modulesFolder) return;

        for (const moduleFolder of await modulesFolder.folderList) await this.setRouters(myRouter, moduleFolder);
    }
}
