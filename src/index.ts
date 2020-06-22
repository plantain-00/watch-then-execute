import minimist from 'minimist'
import * as packageJson from '../package.json'
import { watch } from './core'

function showToolVersion() {
  console.log(`Version: ${packageJson.version}`)
}

function showHelp() {
  console.log(`Version ${packageJson.version}
Syntax:   watch-then-execute [options] [file...]
Examples: watch-then-execute "src/*.ts" --script "npm run build"
          watch-then-execute "src/*.ts" --exclude "src/*.d.ts" --script "npm run build"
Options:
 -h, --help                                         Print this message.
 -v, --version                                      Print the version
 -e, --exclude                                      Exclude files, repeatable
 --script                                           Executed script
`)
}

async function executeCommandLine() {
  const argv = minimist(process.argv.slice(2), { '--': true }) as unknown as {
    v?: unknown
    version?: unknown
    h?: unknown
    help?: unknown
    e: string | string[]
    exclude: string | string[]
    _: string[]
    script: string
  }

  const showVersion = argv.v || argv.version
  if (showVersion) {
    showToolVersion()
    return
  }

  if (argv.h || argv.help) {
    showHelp()
    return
  }

  const inputFiles = argv._
  if (inputFiles.length === 0) {
    throw new Error('expect a path')
  }

  const exclude = argv.e || argv.exclude
  let excludeFiles: string[] = []
  if (Array.isArray(exclude)) {
    for (const e of exclude) {
      excludeFiles = excludeFiles.concat(e.split(','))
    }
  } else if (exclude) {
    excludeFiles = excludeFiles.concat(exclude.split(','))
  }

  const script = argv.script
  if (!script) {
    throw new Error('expect a script')
  }

  watch(inputFiles, excludeFiles, script)
}

executeCommandLine().then(() => {
  console.log('watch then execute success.')
}, error => {
  if (error.stdout) {
    console.log(error.stdout)
    process.exit(error.status)
  } else {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log(error)
    }
    process.exit(1)
  }
})
