# watch-then-execute

[![Dependency Status](https://david-dm.org/plantain-00/watch-then-execute.svg)](https://david-dm.org/plantain-00/watch-then-execute)
[![devDependency Status](https://david-dm.org/plantain-00/watch-then-execute/dev-status.svg)](https://david-dm.org/plantain-00/watch-then-execute#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/watch-then-execute.svg?branch=master)](https://travis-ci.org/plantain-00/watch-then-execute)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/watch-then-execute?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/watch-then-execute/branch/master)
[![npm version](https://badge.fury.io/js/watch-then-execute.svg)](https://badge.fury.io/js/watch-then-execute)
[![Downloads](https://img.shields.io/npm/dm/watch-then-execute.svg)](https://www.npmjs.com/package/watch-then-execute)

A CLI tool to execute script after source file changes.

## install

`yarn global add watch-then-execute`

## usage

`no-unused-export "src/*.ts" --script "npm run build"`

```ts
import { watch } from "watch-then-execute";

watch(["src/*.ts"], [], "npm run build");
```

### exclude files

`no-unused-export "src/*.ts" --exclude "src/*.d.ts" --script "npm run build`

`--exclude`can be repeatable

```ts
import { watch } from "watch-then-execute";

watch(["src/*.ts"], ["src/*.d.ts"], "npm run build");
```
