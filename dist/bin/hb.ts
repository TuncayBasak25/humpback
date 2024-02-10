#!/usr/bin/env node

const args = process.argv.slice(-1);

switch (args.shift()) {
    case "dev": require("../dev"); break;


}
