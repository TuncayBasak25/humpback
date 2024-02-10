import sleep from "sleep";
import { AppGenerator } from "./generator/appGenerator";
import Terminal from "terminal";

(async function(){
    const appGenerator = await AppGenerator.new();

    const compiler = new Terminal();

    compiler.run("tsc -w");

    const nodemon = new Terminal();

    nodemon.run("nodemon");

    while (true) {
        const input = prompt("Waiting your commad");

        console.log("You have written" + input);
        
        await sleep(10);
    }
})()
