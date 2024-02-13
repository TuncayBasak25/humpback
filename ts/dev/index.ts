import sleep from "sleep";
import { AppGenerator } from "./generator/appGenerator";
import Terminal from "terminal";

(async function(){
    const appGenerator = await AppGenerator.new();


    Terminal.open("WCR").run("npx tscli wcr");
})()
