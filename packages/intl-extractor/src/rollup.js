import assert from 'node:assert';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { run } from './intl-extract.js';

export const i18n = {
  localeJson() {
    return {
      name: 'ember-intl/intl-extractor::generate::local-json',
      closeBundle: async () => {
        console.info(`Extracting i18n strings...`);

        const cwd = process.cwd();
        const src = join(cwd, 'src');

        assert(cwd, `cwd / $PWD is not set! cannot extract translations to the locale/en-US.json file`);
        assert(existsSync(src), `Could not find src directory at ${src}`);

        /**
         * By dumping the locale/en-US.json in dist,
         * we get free caching with turbo (since it's already configured)
         * and we don't add duplicate boilerplate to the git history
         */
        await run(src, 'dist/locale/en-US.json');

        console.info(`i18n extraction finished.`);
      },
    };
  },
};

/**
 * Flattens a nested object into dot notation with translation properties
 */
function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], prefixedKey));
    } else {
      acc[prefixedKey] = {
        message: obj[key],
      };
    }
    return acc;
  }, {});
}

export function i18nYamlToJson() {
  return {
    name: 'ember-intl:yaml-to-json',

    buildStart() {
      // Add the input file to Rollup's watch list
      this.addWatchFile('translations/en-us.yaml');
    },

    generateBundle() {
      try {
        const yamlContent = readFileSync('translations/en-us.yaml', 'utf8');

        // Parse YAML to JavaScript object
        const data = load(yamlContent);

        const transformedData = flattenObject(data);

        const jsonContent = JSON.stringify(transformedData, null, 2) + '\n';

        // Create output directory if it doesn't exist
        const outputDir = dirname('dist/locale/en-US.json');
        mkdirSync(outputDir, { recursive: true });

        // Emit the file to Rollup's output
        this.emitFile({
          type: 'asset',
          fileName: 'locale/en-US.json',
          source: jsonContent,
        });
      } catch (error) {
        this.error(`Error processing YAML file: ${error.message}`);
      }
    },
  };
}

