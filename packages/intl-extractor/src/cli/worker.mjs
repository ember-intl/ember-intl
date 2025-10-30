/**
 * The worker needs an mjs extension because when we invoke `node`
 * via commandline and tell it to use this file as a worker, `node`
 * ignores our `type=module` setting in the package.json
 */
import cliArgs from 'command-line-args';
import fs from 'node:fs';

import { extractFromFiles } from '../intl-extract.js';

function getConfig() {
	const optionsDefinitions = [
		{
			name: 'files',
			alias: 'f',
			type: String,
		},
		{
			name: 'out',
			alias: 'o',
			type: String,
		},
	];

	return cliArgs(optionsDefinitions);
}

async function main() {
	const config = getConfig();
	const files = fs.readFileSync(config.files, { encoding: 'utf-8' }).split('\n');

	await extractFromFiles(files, config.out);
}

main();
