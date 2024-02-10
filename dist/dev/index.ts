import path from "path";
import { AppGenerator } from "./generator/appGenerator";

(async function(){
    const appFolderPath = path.join(process.cwd(), "src");

    const appGenerator = await AppGenerator.new(appFolderPath);
})()
