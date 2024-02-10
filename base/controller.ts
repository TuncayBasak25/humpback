import { HB } from "./humpback";

export class Controller extends HB {

    GET() {
        this.res.send("Hello");
    }
}