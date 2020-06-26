import { checkGitStatus } from 'clean-scripts'

const tsFiles = `"src/**/*.ts"`

module.exports = {
  build: [
    'rimraf dist/',
    'tsc -p src/'
  ],
  lint: {
    ts: `eslint --ext .js,.ts,.tsx ${tsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src --strict'
  },
  test: [
    () => checkGitStatus()
  ],
  fix: `eslint --ext .js,.ts,.tsx ${tsFiles} --fix`
}
