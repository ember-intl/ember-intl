import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  babelCompatSupport,
  templateCompatSupport,
} from '@embroider/compat/babel';

export default {
  generatorOpts: {
    compact: false,
  },
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        enableLegacyModules: [
          'ember-cli-htmlbars',
          'ember-cli-htmlbars-inline-precompile',
          'htmlbars-inline-precompile',
        ],
        transforms: [...templateCompatSupport()],
      },
    ],
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: fileURLToPath(
            // eslint-disable-next-line n/no-unsupported-features/node-builtins
            import.meta.resolve('decorator-transforms/runtime-esm'),
          ),
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: dirname(fileURLToPath(import.meta.url)),
        regenerator: false,
        useESModules: true,
      },
    ],
    ...babelCompatSupport(),
  ],
};
