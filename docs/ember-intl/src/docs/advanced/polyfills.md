# Polyfills

`ember-intl` relies on the following APIs from `Intl`. The links on the left column provide browser compatibility.

| API | Polyfill | Requirements |
|--|--|--|
| [Intl.getCanonicalLocales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales#browser_compatibility) | [@formatjs/intl-getcanonicallocales](https://formatjs.github.io/docs/polyfills/intl-getcanonicallocales/) | - |
| [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#browser_compatibility) | [@formatjs/intl-datetimeformat](https://formatjs.github.io/docs/polyfills/intl-datetimeformat/) | `Intl.getCanonicalLocales`, `Intl.Locale`, `Intl.NumberFormat` |
| [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ListFormat#browser_compatibility) | [@formatjs/intl-listformat](https://formatjs.github.io/docs/polyfills/intl-listformat/) | `Intl.getCanonicalLocales`, `Intl.Locale` |
| [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale#browser_compatibility) | [@formatjs/intl-locale](https://formatjs.github.io/docs/polyfills/intl-locale/) | `Intl.getCanonicalLocales` |
| [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#browser_compatibility) | [@formatjs/intl-numberformat](https://formatjs.github.io/docs/polyfills/intl-numberformat/) | `Intl.getCanonicalLocales`, `Intl.Locale`, `Intl.PluralRules` |
| [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules#browser_compatibility) | [@formatjs/intl-pluralrules](https://formatjs.github.io/docs/polyfills/intl-pluralrules/) | `Intl.getCanonicalLocales`, `Intl.Locale` |
| [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat#browser_compatibility) | [@formatjs/intl-relativetimeformat](https://formatjs.github.io/docs/polyfills/intl-relativetimeformat/) | `Intl.getCanonicalLocales`, `Intl.Locale`, `Intl.PluralRules` |

For a comprehensive list of polyfills, see https://formatjs.github.io/docs/polyfills.


## How to Polyfill

Install the polyfill package(s) as a development dependency. Then, import the polyfills in `app/app.ts`.

> [!TIP]
> 
> A more advanced strategy, such as dynamically importing assets or dynamically injecting a script based on the browser requesting the page, is recommended for production apps.
> 
> Covering such strategies is out of scope for this documentation. For more information, see the individual polyfill links in https://formatjs.github.io/docs/polyfills.


### Intl.getCanonicalLocales {#how-to-polyfill-get-canonical-locales}

::: code-group

```ts [app/app.ts]{1}
import '@formatjs/intl-getcanonicallocales/polyfill.js';

import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from 'my-app/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
```

:::


### Intl.Locale {#how-to-polyfill-intl-locale}

::: code-group

```ts [app/app.ts]{1}
import '@formatjs/intl-locale/polyfill.js';

import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from 'my-app/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
```

:::


### Intl.PluralRules {#how-to-polyfill-intl-plural-rules}

> [!IMPORTANT]
> 
> `Intl.PluralRules` requires `Intl.getCanonicalLocales()` and `Intl.Locale` (or their polyfills).

::: code-group

```ts [app/app.ts]{3-7}
import '@formatjs/intl-getcanonicallocales/polyfill.js';
import '@formatjs/intl-locale/polyfill.js';
import '@formatjs/intl-pluralrules/polyfill.js';
import '@formatjs/intl-pluralrules/locale-data/de.js';
import '@formatjs/intl-pluralrules/locale-data/en.js';
import '@formatjs/intl-pluralrules/locale-data/es.js';
import '@formatjs/intl-pluralrules/locale-data/fr.js'; // etc.

import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from 'my-app/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
```

:::


### Intl.RelativeTimeFormat {#how-to-polyfill-intl-relative-time-format}

> [!IMPORTANT]
> 
> `Intl.RelativeTimeFormat` requires `Intl.getCanonicalLocales()`, `Intl.Locale`, and `Intl.PluralRules` (or their polyfills).

::: code-group

```ts [app/app.ts]{8-12}
import '@formatjs/intl-getcanonicallocales/polyfill.js';
import '@formatjs/intl-locale/polyfill.js';
import '@formatjs/intl-pluralrules/polyfill.js';
import '@formatjs/intl-pluralrules/locale-data/de.js';
import '@formatjs/intl-pluralrules/locale-data/en.js';
import '@formatjs/intl-pluralrules/locale-data/es.js';
import '@formatjs/intl-pluralrules/locale-data/fr.js'; // etc.
import '@formatjs/intl-relativetimeformat/polyfill.js';
import '@formatjs/intl-relativetimeformat/locale-data/de.js';
import '@formatjs/intl-relativetimeformat/locale-data/en.js';
import '@formatjs/intl-relativetimeformat/locale-data/es.js';
import '@formatjs/intl-relativetimeformat/locale-data/fr.js'; // etc.

import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from 'my-app/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
```

:::
