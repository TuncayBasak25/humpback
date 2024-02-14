import sleep from "sleep";
import { AppGenerator } from "./appGenerator";
import Terminal from "terminal";

(async function(){
    await AppGenerator.new();


    Terminal.open("WCR").run("npx tscli wcr");
})()
