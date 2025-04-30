/**
 * For testing / debugging certain files.
 * Does the same thing as worke.mjs, but only allows one file.
 */
import cliArgs from 'command-line-args';

import { extractFromFiles } from '../intl-extract.js';

function getConfig() {
	const optionsDefinitions = [
		{
			name: 'file',
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

	await extractFromFiles([config.file], config.out);
}

main();
