import * as minimist from "minimist";
import * as packageJson from "../package.json";
import { watch } from "./core";

function printInConsole(message: any) {
    // tslint:disable-next-line:no-console
    console.log(message);
}

function showToolVersion() {
    printInConsole(`Version: ${packageJson.version}`);
}

async function executeCommandLine() {
    const argv = minimist(process.argv.slice(2), { "--": true });

    const showVersion = argv.v || argv.version;
    if (showVersion) {
        showToolVersion();
        return;
    }

    const inputFiles = argv._;
    if (inputFiles.length === 0) {
        throw new Error("expect a path");
    }

    const exclude: string | string[] = argv.e || argv.exclude;
    let excludeFiles: string[] = [];
    if (Array.isArray(exclude)) {
        for (const e of exclude) {
            excludeFiles = excludeFiles.concat(e.split(","));
        }
    } else if (exclude) {
        excludeFiles = excludeFiles.concat(exclude.split(","));
    }

    const script = argv.script;
    if (!script) {
        throw new Error("expect a script");
    }

    watch(inputFiles, excludeFiles, script);
}

executeCommandLine().then(() => {
    printInConsole("watch then execute success.");
}, error => {
    if (error.stdout) {
        printInConsole(error.stdout);
        process.exit(error.status);
    } else {
        printInConsole(error);
        process.exit(1);
    }
});
