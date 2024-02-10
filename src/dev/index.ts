import sleep from "sleep";
import { AppGenerator } from "./generator/appGenerator";
import Terminal from "terminal";

(async function(){
    const appGenerator = await AppGenerator.new();

    const compiler = new Terminal();

    compiler.run("tsc -w");

    const nodemon = new Terminal();

    nodemon.run("nodemon");
})()
