import { extractAndWrite } from '@formatjs/cli-lib';
import { getPackages } from '@manypkg/get-packages';
import { globby } from 'globby';
import assert from 'node:assert';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const extensions = ['.js', '.ts', '.hbs', '.gjs', '.gts'];

/**
 * 1. Find & translations,
 * 2. extract place in locale/en-US.json (or the outputPath)
 *
 * @param {string} directory
 * @param {string} [ outputPath ]
 * @return {Promise<void>}
 */
export async function run(directory, outputPath = 'locale/en-US.json') {
	const files = await gatherFiles(directory);
	await extractFromFiles(files, outputPath);
}

/**
 * @param {string} directory
 * @return {Promise<string[]>}
 */
export async function gatherFiles(directory) {
	const files = await globby(
		extensions.map((ext) => `**/*${ext}`),
		{ cwd: directory },
	);

	const fullPaths = files
		.filter((file) => {
			if (file.endsWith('.d.ts')) {
				return false;
			}
			return true;
		})
		.map((file) => join(directory, file));

	return fullPaths;
}

/**
 * For dependencies in our monorepo, check the locale/en-US.json files.
 * Dependencies exclusively in node_modules from outside the monorepo are not supported.
 *
 * @param {string} directory the directory to find dependencies from
 * @return {Promise<object[]>} the parsed json files for all the locale/en-US.json files for each dependency
 */
export async function readFromDependencies(directory) {
	const manifestPath = join(directory, 'package.json');

	assert(existsSync(manifestPath), `Could not find manifest at ${manifestPath}`);

	const manifestBuffer = await readFile(manifestPath);
	const manifest = JSON.parse(manifestBuffer.toString());

	const depndencies = Object.keys(manifest.dependencies || {});

	if (depndencies.length === 0) {
		return [];
	}

	const dependencyNames = new Set(depndencies);

	const { packages } = await getPackages(directory);

	const relevantPackages = packages.filter((pkg) => dependencyNames.has(pkg.packageJson.name));

	if (relevantPackages.length === 0) {
		return [];
	}

	const result = [];
	for (const pkg of relevantPackages) {
		const localePath = join(pkg.dir, 'dist/locale/en-US.json');

		if (!existsSync(localePath)) {
			continue;
		}

		const buffer = await readFile(localePath);
		const json = JSON.parse(buffer.toString());

		result.push(json);
	}

	return result;
}

/**
 * Extracts translation strings from the passed files array and
 * writes a locale/en-US.json
 *
 * @param {string[]} files
 * @param {string} [outputPath] defaults to locale/en-US.json
 * @return {Promise<void>}
 */
export async function extractFromFiles(files, outputPath = 'locale/en-US.json') {
	await extractAndWrite(files, {
		outFile: outputPath,
		idInterpolationPattern: '[sha512:contenthash:base64:6]',
		format: 'crowdin',
		readFromStdin: false,
		flatten: true,
	});
}
