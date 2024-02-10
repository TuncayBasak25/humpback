#!/usr/bin/env node
"use strict";
const args = process.argv.slice(-1);
switch (args.shift()) {
    case "dev":
        require("../dev");
        break;
}
