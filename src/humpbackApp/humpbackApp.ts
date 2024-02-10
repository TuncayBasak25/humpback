import { HTTPMethod } from "../types/httpMethod";

import express, { Application, Router } from "express";
import { Folder } from "file-system";


export const server = express();

export class HumpbackApp {

    static async create({ port = process.env.PORT || 3000, callBack = () => console.log("Humpback app started.") }: { port: string | number, callBack: () => void }) {
        const app = new HumpbackApp();

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
    }

    public readonly expressServer: Application = express();
    private constructor() {}

    private async setRouters(router?: Router, appFolder?: Folder) {
        appFolder = appFolder || await Folder.open(process.cwd(), "dist", "app");

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


                console.log(method, url);
                myRouter[method](url, (...args: any[]) => new Controller(...args, protoName));
            }
        }


        (router || server).use(router ? appFolder.name : "/", myRouter);

        const modulesFolder = await appFolder.hasFolder("modules");

        if (!modulesFolder) return;

        for (const moduleFolder of await modulesFolder.folderList) await this.setRouters(myRouter, moduleFolder);
    }
}

