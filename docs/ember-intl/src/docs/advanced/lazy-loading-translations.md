# Lazy-loading translations

By default, translations in `/translations` are bundled with `app.js`. For large apps, you may prefer to have translations in the `dist` folder and load them at runtime.


## 1. Configure ember-intl {#1-configure-ember-intl}

### v1 apps (classic) {#1-configure-ember-intl-v1-apps-classic}

Create `config/ember-intl.js` to set `publicOnly` to `true`.

::: code-group

```js [config/ember-intl.js]{3}
module.exports = function (/* environment */) {
  return {
    publicOnly: true,
  };
};
```

:::

When you run `ember serve` or `ember build -prod`, you will find translations (as JSON) in `/dist/translations`.

```sh {:no-line-numbers}
my-app
└── dist
    └── translations
        ├── de-de.json
        └── en-us.json
```

### v1 apps (Embroider + Webpack) {#1-configure-ember-intl-v1-apps}

Update `config/ember-intl.js` as shown above. Then, in `ember-cli-build.js`, configure Webpack to [treat translations as assets](https://webpack.js.org/guides/asset-modules/).

::: code-group

```js [ember-cli-build.js]{17-20}
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

:::


### v2 apps {#1-configure-ember-intl-v2-apps}

There is nothing to do. The configuration files `ember-intl.config.{js,mjs}`, `ember-cli-build.js`, and `vite.config.mjs` remain the same.


## 2. Lazy-load translations {#2-lazy-load-translations}

No matter how the app is built, we can abstract how to lazy-load translations like this:

::: code-group

```ts [app/routes/application.ts]{12}
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

:::

For brevity, the code below only shows `loadTranslations`, the part that is different.


### v1 apps (classic) {#2-lazy-load-translations-v1-apps-classic}

Use native `fetch` to load translation files.

::: code-group

```ts [app/routes/application.ts]{3-4}
export default class ApplicationRoute extends Route {
  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    const response = await fetch(`/translations/${locale}.json`);
    const translations = await response.json() as Record<string, string>;

    this.intl.addTranslations(locale, translations);
  }
}
```

:::


### v1 apps (Embroider + Webpack) {#2-lazy-load-translations-v1-apps}

Use dynamic import to load translation files.

::: code-group

```ts [app/routes/application.ts]{3-8}
export default class ApplicationRoute extends Route {
  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    const { default: file } = (await import(
      `/translations/${locale}.json`
    )) as {
      default: string;
    };
    const translations = JSON.parse(file) as Record<string, string>;

    this.intl.addTranslations(locale, translations);
  }
}
```

:::


### v2 apps {#2-lazy-load-translations-v2-apps}

Use dynamic import to load translation files.

::: code-group

```ts [app/routes/application.ts]{1-4,8}
const translationModules = {
  'de-de': () => import('virtual:ember-intl/translations/de-de'),
  'en-us': () => import('virtual:ember-intl/translations/en-us'),
} as const;

export default class ApplicationRoute extends Route {
  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    const { default: translations } = await translationModules[locale]();

    this.intl.addTranslations(locale, translations);
  }
}
```

:::

> [!NOTE]
> 
> File paths prefixed with `virtual:` are called a "virtual module" in Vite. They don't physically exist on disk.


## 3. Fingerprint translations <Badge text="Only for v1 apps (classic)" type="warning" /> {#3-fingerprint-translations}

### v1 apps (classic) {#3-fingerprint-translations-v1-apps-classic}

In Ember apps with a classic build, we use [`broccoli-asset-rev`](https://github.com/ember-cli/broccoli-asset-rev) to fingerprint files.

Open `ember-cli-build.js`, then add `'json'` to `fingerprint.extensions`. The following example shows 6 default values for `fingerprint.extensions` plus `'json'`.

::: code-group

```js [ember-cli-build.js]{3-5}
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
    },
  });

  // ...
};
```

:::

Recall the implementation for `loadTranslations`.

::: code-group

```ts [app/routes/application.ts]{3}
export default class ApplicationRoute extends Route {
  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    const response = await fetch(`/translations/${locale}.json`);
    const translations = await response.json() as Record<string, string>;

    this.intl.addTranslations(locale, translations);
  }
}
```

:::

Had the file path for `fetch` been static (i.e. if we could write `fetch('/translations/de-de.json')` and `fetch('/translations/en-us.json')`, `broccoli-asset-rev` would have been able to find the files and hash their names. Step 3 would end here.

The path is dynamic, however, so we need to get the correct path from an "asset map":

::: code-group

```ts [app/routes/application.ts]{3-15}
export default class ApplicationRoute extends Route {
  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
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
    const translations = await response.json() as Record<string, string>;

    this.intl.addTranslations(locale, translations);
  }
}
```

```js [ember-cli-build.js]{5-6}
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
      fingerprintAssetMap: true,
      generateAssetMap: true,
    },
  });
};
```

:::

You will see that file names are hashed only for production.

```sh {:no-line-numbers}
# Development
my-app
└── dist
    └── translations
        ├── de-de.json
        └── en-us.json
```

```sh {:no-line-numbers}
# Production
my-app
└── dist
    └── translations
        ├── de-de-825f3177f5b85adcb9029643007ebcf9.json
        └── en-us-b1cfad13180d11102395dd387f10f673.json
```
