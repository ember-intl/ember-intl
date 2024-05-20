# Lazy-loading translations

By default, translations in the `translations` folder are bundled with `app.js`. For large apps, you may prefer to have translations in the `dist` folder and load them at runtime.


## Writing translations to `dist`

In `config/ember-intl.js`, set `publicOnly` to `true`. Translations will no longer be bundled with `app.js`.


## Load translations at runtime

Use native `fetch` to load a translation file.

```ts
/* routes/application.ts */
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


## Fingerprinting

**WARNING: For classic apps only**

In `ember-cli-build.js`, add `'json'` to [`fingerprint.extensions`](https://github.com/ember-cli/broccoli-asset-rev).

```js
const app = new EmberApp(defaults, {
  fingerprint: {
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
  },
});
```

When the path to a translation file is static (e.g. `translations/en-us.json` instead of `translations/${locale}.json`), `broccoli-asset-rev` will pick it up and rewrite it in place already.

If interpolation is required, you can load `assetMap` and enable fingerprinting for it.

```js
const app = new EmberApp(defaults, {
  fingerprint: {
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
    fingerprintAssetMap: true,
    generateAssetMap: true,
  },
});
```

Then, fetch `assetMap` in the production environment:

```js
import ENV from 'my-app/config/environment';

let filePath = `translations/${locale}.json`;

if (ENV.environment === 'production') {
  const response = await fetch('/assets/assetMap.json');
  const assetMap = await response.json();

  filePath = assetMap.assets[filePath];
}

const translations = await fetch(`/${filePath}`);
```
