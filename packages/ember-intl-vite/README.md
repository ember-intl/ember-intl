# @ember-intl/vite

_Loads translations in v2 apps with `ember-intl`_


## Quickstart

1\. Install `@ember-intl/vite` as a development dependency.<sup>1,2</sup>

```sh
pnpm add -D @ember-intl/vite
```

<sup>1. V2 apps (Embroider + Vite) need this package.</sup>

<sup>2. V2 addons need it if their test app lives in the same package as the addon (not recommended).</sup>

2\. In `vite.config.mjs`, add `loadTranslations` to the list of plugins.

```diff
+ import { loadTranslations } from '@ember-intl/vite';
import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
+     loadTranslations(),
  ],
});
```

3\. In `tsconfig.json`, add `@ember-intl/vite/virtual` to `compilerOptions.types`.

```diff
{
  "compilerOptions": {
    "types": [
      "ember-source/types",
      "@embroider/core/virtual",
      "@glint/ember-tsc/types",
-       "vite/client"
+       "vite/client",
+       "@ember-intl/vite/virtual"
    ]
  }
}
```

4\. Use `import` to load translations.

```diff
/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';
+ import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
+ import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
+     this.intl.addTranslations('de-de', translationsForDeDe);
+     this.intl.addTranslations('en-us', translationsForEnUs);
+
    this.intl.setLocale(['en-us']);
  }
}
```

You can also load translations for all rendering and unit tests.

```diff
/* tests/helpers/index.ts */
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  type SetupTestOptions,
} from 'ember-qunit';
+ import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
+ import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupRenderingTest(hooks, options);

  // Additional setup for rendering tests can be done here.
+   hooks.beforeEach(function () {
+     const intl = this.owner.lookup('service:intl');
+ 
+     intl.addTranslations('de-de', translationsForDeDe);
+     intl.addTranslations('en-us', translationsForEnUs);
+   });
}

export { setupApplicationTest, setupRenderingTest, setupTest };
```

Optional: [Create a configuration file](./docs/configuration.md).



## Compatibility

- `ember-intl` v8.0.0 or above
- Node.js v20 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](./LICENSE.md).
