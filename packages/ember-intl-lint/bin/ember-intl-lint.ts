#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runCodemod } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = '@ember-intl/lint';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('root', {
    describe: 'Where to run the codemod',
    type: 'string',
  })
  .parseSync();

const codemodOptions: CodemodOptions = {
  projectRoot: argv['root'] ?? process.cwd(),
};

runCodemod(codemodOptions)
  .then((lintResults) => {
    let runFailed = false;

    for (const [lintRule, failed] of Object.entries(lintResults)) {
      if (failed.length === 0) {
        console.log(`✅ ${lintRule}`);
        console.log();

        continue;
      }

      runFailed = true;

      console.log(`❌ ${lintRule} (${failed.length} issues)\n`);
      console.log(failed.join('\n'));
      console.log();
    }

    process.exitCode = runFailed ? 1 : 0;
  })
  .catch((error) => {
    console.log((error as Error).message);
    console.log();

    process.exitCode = 1;
  });
