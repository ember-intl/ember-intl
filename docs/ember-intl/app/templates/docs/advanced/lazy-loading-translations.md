# Lazy-loading translations

By default, translations in the `translations` folder are bundled with `app.js`. For large apps, you may prefer to have translations in the `dist` folder and load them at runtime.


## 1. Configure ember-intl

In `config/ember-intl.js`, set `publicOnly` to `true`.

```js
module.exports = function (/* environment */) {
  return {
    publicOnly: true,
  };
};
```


## 2. Load translations at runtime

Use native `fetch` to load a translation file.

```ts
/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel() {
    await Promise.allSettled([
      this.loadTranslations('de-de'),
      this.loadTranslations('en-us'),
    ]);

    this.intl.setLocale(['en-us']);
  }

  private async loadTranslations(locale: 'de-de' | 'en-us') {
    const response = await fetch(`/translations/${locale}.json`);
    const translations = await response.json();

    this.intl.addTranslations(locale, translations);
  }
}
```

After you run `ember serve` or `ember build -prod`, you will find translations (as JSON files) in the `dist/translations` folder.

```sh
my-app
└── dist
    └── translations
        ├── de-de.json
        └── en-us.json
```


## 3. Fingerprint translations

### Classic build

In Ember apps with a classic build, we use [`broccoli-asset-rev`](https://github.com/ember-cli/broccoli-asset-rev) to fingerprint files.

Open `ember-cli-build.js`, then add `'json'` to `fingerprint.extensions`. The following example shows 6 default values for `fingerprint.extensions` plus `'json'`.

```js
const app = new EmberApp(defaults, {
  fingerprint: {
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
  },
});
```

Recall `loadTranslations()` from Step 2. Had the paths to translation files been static (i.e. had we written `await fetch('/translations/de-de.json')` and `await fetch('/translations/en-us.json')`, `broccoli-asset-rev` would have been able to find the files and hash their names. End of Step 3.

However, since the paths are dynamic, we need to get the correct path from the asset map:

```diff
const app = new EmberApp(defaults, {
  fingerprint: {
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
+     fingerprintAssetMap: true,
+     generateAssetMap: true,
  },
});
```

```ts
private async loadTranslations(locale: 'de-de' | 'en-us') {
  const filePath = `translations/${locale}.json`;
  let resource: string;

  if (ENV.environment === 'production') {
    const response = await fetch('/assets/assetMap.json');
    const assetMap = await response.json();

    resource = `/${assetMap.assets[filePath]}`;
  } else {
    resource = `/${filePath}`;
  }

  const response = await fetch(resource);
  const translations = await response.json();

  this.intl.addTranslations(locale, translations);
}
```

Now, file names will be hashed only in production.

```sh
# Development
my-app
└── dist
    └── translations
        ├── de-de.json
        └── en-us.json
```

```sh
# Production
my-app
└── dist
    └── translations
        ├── de-de-825f3177f5b85adcb9029643007ebcf9.json
        └── en-us-b1cfad13180d11102395dd387f10f673.json
```


### Embroider build (Webpack)

**WARNING: The original files will remain in the `dist/translations` folder, but shouldn't affect production. Please let us know if you know how to remove these.**

In `ember-cli-build.js`, configure Webpack to [treat translations as assets](https://webpack.js.org/guides/asset-modules/).

```js
'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // ...
  });

  const options = {
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              generator: {
                filename: '[path][name]-[hash][ext][query]',
              },
              test: /(node_modules\/\.embroider\/rewritten-app\/translations\/)(.*\.json)$/,
              type: 'asset/resource',
            },
          ],
        },
      },
    },
    // ...
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
```

Afterwards, in `loadTranslations()` from Step 2, use dynamic import to get the asset URL.

```ts
private async loadTranslations(locale: 'de-de' | 'en-us') {
  const { default: resource } = await import(`/translations/${locale}.json`);

  const response = await fetch(resource);
  const translations = await response.json();

  this.intl.addTranslations(locale, translations);
}
```

File names will be hashed in development and production.

```sh
my-app
└── dist
    └── translations
        ├── de-de-12356e988bf952560f6e.json
        ├── de-de.json
        ├── en-us-31e4a23c9d04705ba9bf.json
        └── en-us.json
```
