# Lazy-loading translations

By default, translations in the `translations` folder are bundled with `app.js`. For large apps, you may prefer to have translations in the `dist` folder and load them at runtime.


## 1. Configure ember-intl

### v1 apps (Classic)

In `config/ember-intl.js`, set `publicOnly` to `true`.

```js
module.exports = function (/* environment */) {
  return {
    publicOnly: true,
  };
};
```

When you run `ember serve` or `ember build -prod`, you will find translations (as JSON files) in the `dist/translations` folder.

```
my-app
└── dist
    └── translations
        ├── de-de.json
        └── en-us.json
```

### v1 apps (Embroider + Webpack)

Update `config/ember-intl.js` as shown above.

Then, in `ember-cli-build.js`, configure Webpack to [treat translations as assets](https://webpack.js.org/guides/asset-modules/).

```js
'use strict';

const { compatBuild } = require('@embroider/compat');
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
              test: /(node_modules\/\.embroider\/rewritten-app\/translations\/)(.*\.json)$/,
              type: 'asset/source',
            },
          ],
        },
      },
    },
    // ...
  };

  return compatBuild(app, Webpack, options);
};
```


### v2 apps

There is nothing to do. The files `ember-intl.config.{js,mjs}`, `ember-cli-build.js`, and `vite.config.mjs` remain the same.


## 2. Lazy-load translations

No matter how the app is built, we can abstract how to lazy-load translations like this:

```ts
/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel(): Promise<void> {
    await this.setupIntl();
  }

  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    // ...
  }

  private async setupIntl(): Promise<void> {
    await Promise.allSettled([
      this.loadTranslations('de-de'),
      this.loadTranslations('en-us'),
    ]);

    this.intl.setLocale(['en-us']);
  }
}
```

For brevity, the guide will only show what's to be done differently below.


### v1 apps (Classic)

Use native `fetch` to load translation files.

```ts
private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
  const response = await fetch(`/translations/${locale}.json`);
  const translations = await response.json() as Record<string, string>;

  this.intl.addTranslations(locale, translations);
}
```


### v1 apps (Embroider + Webpack)

Use dynamic import to load translation files.

```ts
private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
  const { default: file } = (await import(
    `/translations/${locale}.json`
  )) as {
    default: string;
  };
  const translations = JSON.parse(file) as Record<string, string>;

  this.intl.addTranslations(locale, translations);
}
```


### v2 apps

Use dynamic import to load translation files. (Note, file paths prefixed with `virtual:` are called a "virtual module" in Vite. They don't physically exist on disk.)

```ts
const translationModules = {
  'de-de': () => import('virtual:ember-intl/translations/de-de'),
  'en-us': () => import('virtual:ember-intl/translations/en-us'),
} as const;

private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
  const { default: translations } = await translationModules[locale]();

  this.intl.addTranslations(locale, translations);
}
```


## 3. Fingerprint translations

This step applies to classic apps only.


### v1 apps (Classic)

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

```diff
private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
+   const filePath = `translations/${locale}.json`;
+   let resource: string;
+
+   if (ENV.environment === 'production') {
+     const response = await fetch('/assets/assetMap.json');
+     const assetMap = await response.json();
+
+     resource = `/${assetMap.assets[filePath]}`;
+   } else {
+     resource = `/${filePath}`;
+   }
+
-   const response = await fetch(`/translations/${locale}.json`);
+   const response = await fetch(resource);
  const translations = await response.json() as Record<string, string>;

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
