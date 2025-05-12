# Intl-Extractor


Bundled tool with ember-intl to automatically create translation files from a source-language.

## Usage


**CLI** (for apps)
```bash
npm exec intl-extract
```

or

**Rollup** (for libraries)

```js
import { i18nYamlToJson, i18n } from 'ember-intl/rollup';


// ...
plugins: [
    // Convert Manually managed i18n yaml
    // to the output json format for placement in dist
    i18nYamlToJson(),

    // OR
    // Automatically crowl your src directory and generate
    // the output json for placement in dist.
    i18n()
]
```

The generated `dist/locale/*` file would be consumed by an application to merge with its translation files.


## TODO

- output format should be configurable ( message keys, translation keys, or no object entirely)
- i18nYamlToJson needs configurable values
