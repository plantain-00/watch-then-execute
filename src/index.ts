import * as minimist from "minimist";
import * as chokidar from "chokidar";
import * as minimatch from "minimatch";
import * as debounce from "lodash.debounce";
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

    const excludeFilesString: string | undefined = argv.e || argv.exclude;
    const excludeFiles = excludeFilesString ? excludeFilesString.split(",") : [];

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
        subProcess.stdout.on("data", chunk => {
            printInConsole(chunk);
        });
    }, 500);

    chokidar.watch(inputFiles).on("all", (type: string, file: string) => {
        if (excludeFiles.every(excludeFile => !minimatch(file, excludeFile))) {
            printInConsole(`Detecting: ${file}`);
            debounced();
        }
    });
}

try {
    executeCommandLine().then(() => {
        printInConsole("success.");
    }, error => {
        if (error.stdout) {
            printInConsole(error.stdout);
            process.exit(error.status);
        } else {
            printInConsole(error);
            process.exit(1);
        }
    });
} catch (error) {
    if (error.stdout) {
        printInConsole(error.stdout);
        process.exit(error.status);
    } else {
        printInConsole(error);
        process.exit(1);
    }
}
