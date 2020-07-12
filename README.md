# watch-then-execute

[![Dependency Status](https://david-dm.org/plantain-00/watch-then-execute.svg)](https://david-dm.org/plantain-00/watch-then-execute)
[![devDependency Status](https://david-dm.org/plantain-00/watch-then-execute/dev-status.svg)](https://david-dm.org/plantain-00/watch-then-execute#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/watch-then-execute.svg?branch=master)](https://travis-ci.org/plantain-00/watch-then-execute)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/watch-then-execute?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/watch-then-execute/branch/master)
![Github CI](https://github.com/plantain-00/watch-then-execute/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/watch-then-execute.svg)](https://badge.fury.io/js/watch-then-execute)
[![Downloads](https://img.shields.io/npm/dm/watch-then-execute.svg)](https://www.npmjs.com/package/watch-then-execute)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fwatch-then-execute%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/watch-then-execute)

A CLI tool to execute script after source file changes.

## install

`yarn global add watch-then-execute`

## usage

`watch-then-execute "src/*.ts" --script "npm run build"`

## options

key | description
--- | ---
-e,--exclude | exclude files, repeatable
--script | executed script
-h,--help | Print this message.
-v,--version | Print the version

## API

```ts
import { watch } from "watch-then-execute";

watch(["src/*.ts"], [], "npm run build");
watch(["src/*.ts"], ["src/*.d.ts"], "npm run build");
```

### exclude files

`watch-then-execute "src/*.ts" --exclude "src/*.d.ts" --script "npm run build"`
