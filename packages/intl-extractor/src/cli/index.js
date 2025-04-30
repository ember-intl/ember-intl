#!/usr/bin/env node
import chalk from 'chalk';
import cliArgs from 'command-line-args';
import { execa, execaSync } from 'execa';
import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { extensions, gatherFiles, readFromDependencies } from '../intl-extract.js';

function write(str) {
  console.log(chalk.grey(str));
}

function warn(str) {
  console.log(`\t` + chalk.yellow(str));
}

function raise(error) {
  if (process.env.DEBUG) {
    throw new Error(error);
  }
  write(chalk.red(error));
  return process.exit(1);
}

const PROJECT_ROOT = path.join(import.meta.dirname, '../../../..');
const WORKER = path.join(import.meta.dirname, './worker.mjs');

function nicePath(filePath) {
  return path.relative(PROJECT_ROOT, filePath);
}
function niceCWDPath(filePath) {
  return path.relative(process.cwd(), path.join(PROJECT_ROOT, filePath));
}

function getConfig() {
  const optionsDefinitions = [
    {
      name: 'jobs',
      alias: 'j',
      type: Number,
      defaultValue: process.env.JOBS ? Number(process.env.JOBS) : 16,
    },
    {
      name: 'diff',
      alias: 'd',
      type: Boolean,
      defaultValue: false,
    },
    {
      name: 'path',
      alias: 'p',
      type: String,
      defaultValue: 'app',
    },
    {
      name: 'addLocaleToCommit',
      alias: 'a',
      type: Boolean,
      defaultValue: false,
    },
    {
      name: 'outFile',
      alias: 'o',
      type: String,
      defaultValue: `locale/en-US.json`,
    },
    {
      name: 'incremental',
      alias: 'i',
      type: Boolean,
      defaultValue: false,
    },
  ];

  const options = cliArgs(optionsDefinitions, { partial: true });

  if (options.diff) {
    options.incremental = true;
  }

  return options;
}

async function main() {
  const config = getConfig();
  const workingDirectory = nicePath(process.cwd());
  const CWD = process.cwd();
  const directory = CWD;
  const outFile = path.join(directory, config.outFile);
  const fullFilterDir = path.join(directory, config.path);
  const filterDir = path.join(CWD, config.path);

  if (config.diff) {
    const result = execaSync(`git`, ['diff', '--name-only']);
    config.files = result.stdout.split('\n').join(',');
  }

  let files = [];
  const EXTs = new Set(extensions);

  if (config.files) {
    const possibleFiles = config.files.split(',');
    possibleFiles.forEach((f) => {
      const filePath = path.resolve(PROJECT_ROOT, f);
      const niceFilePath = nicePath(filePath);

      if (
        niceFilePath.startsWith(filterDir) &&
        EXTs.has(path.extname(niceFilePath)) &&
        !niceFilePath.endsWith('.d.ts')
      ) {
        files.push(niceFilePath);
      } else {
        warn(`Ignoring Unmatched File :: ${niceCWDPath(niceFilePath)}`);
      }
    });
  }

  write(`${chalk.white('\n\nintl-extractor')}\n==================================\n\n`);
  write(`Working Directory :: ${chalk.cyan(workingDirectory)}\n\n`);
  write(
    `Running :: ${chalk.cyan('intl-extract')}` +
    `\n\t--diff=${chalk.yellow(config.diff ? 'true' : 'false')}` +
    `\n\t--incremental=${chalk.yellow(config.incremental ? 'true' : 'false')}` +
    `\n\t--jobs=${chalk.yellow(config.jobs)}` +
    `\n\t--outFile=${chalk.magenta(config.outFile)}` +
    `\n\t--path=${chalk.magenta(config.path || "''")}` +
    `\n\t--files=${chalk.magenta(files.join(',') || "''")}\n\n`,
  );

  if (!config.files) {
    files = await gatherFiles(fullFilterDir);
  }

  const jobs = [];
  if (files.length) {
    if (files.length < config.jobs) {
      config.jobs = files.length;
    }
    fsSync.mkdirSync(path.join(PROJECT_ROOT, 'tmp'), { recursive: true });
    write(`Found ${chalk.yellow(files.length)} matching files...`);
    const filesPerThread = Math.floor(files.length / config.jobs);
    for (let i = 0; i < config.jobs; i++) {
      let jobFiles;
      if (i + 1 === config.jobs) {
        jobFiles = files.slice(i * filesPerThread);
      } else {
        jobFiles = files.slice(i * filesPerThread, (i + 1) * filesPerThread);
      }

      const jobInFile = path.join(PROJECT_ROOT, 'tmp', `files-list-${i}.txt`);
      const jobOutFile = path.join(PROJECT_ROOT, 'tmp', `partial-extract-${i}.json`);

      write(`Exec :: ${chalk.cyan(`node ${nicePath(WORKER)} -f ${nicePath(jobInFile)} -o ${nicePath(jobOutFile)}`)}`);

      fsSync.writeFileSync(jobInFile, jobFiles.join('\n'), { encoding: 'utf-8' });
      fsSync.writeFileSync(jobOutFile, '{}', { encoding: 'utf-8' });

      const promise = execa(`node`, [WORKER, '-f', jobInFile, '-o', jobOutFile], {
        shell: true,
        preferLocal: true,
        cwd: process.cwd(),
      });
      const job = {
        files: jobFiles,
        promise,
        jobInFile,
        jobOutFile,
      };
      promise.then((r) => (job.result = r));
      jobs.push(job);
    }
    await Promise.all(jobs.map((j) => j.promise));
  } else {
    write(chalk.green(`No Matching Files Found`));
    return;
  }

  // assemble final file
  const translations = {};

  if (config.incremental) {
    const data = JSON.parse(fsSync.readFileSync(outFile, { encoding: 'utf-8' }));
    Object.assign(translations, data);
  }

  jobs.forEach((job) => {
    try {
      const data = fsSync.readFileSync(job.jobOutFile, { encoding: 'utf-8' });
      Object.assign(translations, JSON.parse(data));
    } catch (e) {
      console.log(job.result);
      raise(e.message);
      return;
    }
  });

  const fromDependencies = await readFromDependencies(CWD);

  Object.assign(translations, ...fromDependencies);

  const finalTranslations = {};
  const keys = Object.keys(translations).sort();
  keys.forEach((key) => {
    finalTranslations[key] = translations[key];
  });

  const dir = path.dirname(outFile);
  await fs.mkdir(dir, { recursive: true });

  fsSync.writeFileSync(outFile, JSON.stringify(finalTranslations, null, 2) + '\n', { encoding: 'utf-8' });

  if (config.addLocaleToCommit) {
    await execa(`git`, ['add', outFile], {
      shell: true,
      preferLocal: true,
      cwd: process.cwd(),
    });
  }
}

main();
