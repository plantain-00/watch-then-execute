import * as minimist from "minimist";
import * as chokidar from "chokidar";
import debounce = require("lodash.debounce");
import * as childProcess from "child_process";
import * as packageJson from "../package.json";

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

    let subProcess: childProcess.ChildProcess | undefined;
    const debounced = debounce(async () => {
        if (subProcess) {
            subProcess.kill();
        }
        subProcess = childProcess.exec(script, (error, stdout, stderr) => {
            subProcess = undefined;
        });
        subProcess.stdout.pipe(process.stdout);
        subProcess.stderr.pipe(process.stderr);
    }, 500);

    chokidar.watch(inputFiles, { ignored: excludeFiles }).on("all", (type: string, file: string) => {
        printInConsole(`Detecting: ${file}`);
        debounced();
    });
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
