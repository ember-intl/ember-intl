# Asynchronously loading translations

## Writing Translations to `dist` folder

By default, translations stored in `<project root>/translations/**.{yml,xml}` are bundled with your application code. Depending on scenario, this may not be an optimal way to ship your translations to the client. If you prefer to opt out of this behavior and just write to somewhere in the `dist` folder you can use the `publicOnly` option.

At build time, translations will be now written to the `dist` output path instead of bundled within `app.js`. For an example of how to load these translations at runtime, continue reading the next section.

```js
// config/ember-intl.js
module.exports = function() {
  return {
    publicOnly: true
  };
};
```


## Pushing translations into ember-intl

```js
// app/routes/application.js
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service intl;
 
  async beforeModel() {
    const response = await fetch('/translations/en-us.json');
    const translations = await response.json();

    this.intl.addTranslations('en-US', translations);
  }
}
```


## Fingerprinting

Add `json` files to [`broccoli-asset-rev`](https://github.com/rickharrison/broccoli-asset-rev) settings:

```js
let app = new EmberApp(defaults, {
  fingerprint: {
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json']
  }
});
```

As long as the full path to a given translation file is hard-coded and uninterpolated, e.g. `translations/en-us.json` instead of `translations/${language}.json`, broccoli-asset-rev will pick it up and rewrite it in place already.

For cases where interpolation is required, load `assetMap` and enable fingerprinting for it.

```js
let app = new EmberApp(defaults, {
  fingerprint: {
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
    generateAssetMap: true,
    fingerprintAssetMap: true
  }
});
```

Then fetch `assetMap`  in production environment:

```js
import ENV from 'my-app/config/environment';

let translationPath = `translations/${lang}.json`;

if (ENV.environment === 'production') {
  const response = await fetch('/assets/assetMap.json');
  const assetMap = await response.json();

  translationPath = assetMap.assets[translationPath];
}

const translations = await fetch(`/${translationPath}`);
```