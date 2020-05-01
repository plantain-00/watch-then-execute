import * as chokidar from 'chokidar'
import debounce from 'lodash/debounce'
import * as childProcess from 'child_process'

/**
 * @public
 */
export function watch(inputFiles: string[], excludeFiles: string[], script: string | (() => void)) {
  let subProcess: childProcess.ChildProcess | undefined
  const debounced = debounce(() => {
    if (subProcess) {
      subProcess.kill()
    }
    if (typeof script === 'string') {
      subProcess = childProcess.exec(script, (error, stdout, stderr) => {
        if (error) {
          console.error(error)
        }
        subProcess = undefined
      })
      if (subProcess.stdout) {
        subProcess.stdout.pipe(process.stdout)
      }
      if (subProcess.stderr) {
        subProcess.stderr.pipe(process.stderr)
      }
    } else {
      script()
    }
  }, 500)

  chokidar.watch(inputFiles, { ignored: excludeFiles }).on('all', (type: string, file: string) => {
    console.log(`Detecting: ${file}`)
    debounced()
  })
}
