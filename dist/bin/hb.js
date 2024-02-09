#!/usr/bin/env node
"use strict";
const args = process.argv.slice(-2);
switch (args.shift()) {
    case "dev":
        require("../dev");
        break;
}
