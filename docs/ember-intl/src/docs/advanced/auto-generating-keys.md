# Auto-generating keys

By default, `ember-intl` asks you to come up with translation keys in `/translations`.

::: code-group

```gts [app/templates/application.gts]
import { t } from 'ember-intl';

<template>
  {{t "hello.message" name="Zoey"}}
</template>
```

```json [translations/en-us.json]
{
  "hello.message": "Hello, {name}!"
}
```

:::

Manually creating and maintaining keys can be cumbersome if you have a production app and need to support many locales.

Here's how you can [auto-generate keys](https://formatjs.github.io/docs/getting-started/message-extraction/).


## 1. Use `formatMessage` {#1-use-format-message}

In templates, use the `formatMessage` helper and pass the translation that you want for your default locale.

::: code-group

```gts [app/templates/application.gts]{4}
import { formatMessage } from 'ember-intl';

<template>
  {{formatMessage "Hello, {name}!" name="Zoey"}}
</template>
```

:::

In classes, you have the option to inject the `intl` service.

::: code-group

```gts [app/components/hello.gts]{15}
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';

interface HelloSignature {
  Args: {
    name: string;
  };
}

export default class Hello extends Component<HelloSignature> {
  get message(): string {
    const { name } = this.args;

    return this.intl.formatMessage('Hello, {name}!', {
      name,
    });
  }

  <template>
    {{this.message}}
  </template>
}
```

:::


## 2. Extract translations {#2-extract-translations}

Install `@formatjs/cli` as a development dependency, then add the following script:

::: code-group

```json [package.json]
{
  "scripts": {
    "extract-translations": "formatjs extract \"app/**/*.{gjs,gts,hbs,js,ts}\" --format simple --ignore \"**/*.d.ts\" > translations/en-us.json"
  },
  "devDependencies": {
    "@formatjs/cli": "..."
  }  
}
```

:::

Run the script to get the translation file for the default locale.

::: code-group

```json [translations/en-us.json]
{
  "tBFOH1": "Hello, {name}!"
}
```

:::

Now that you have a translation file with unique keys, you can create translation files for the other locales in one of two ways:

- Manual: Duplicate the default locale file, then update translations.
- Use a Translation Management System (TMS).


## 3. Convert `formatMessage` to `t` {#3-convert-format-message-to-t}

Lastly, we need to change all the `formatMessage`'s to `t`'s, so that your users see the right translations when the locale is changed. You can install [`ember-formatjs`](https://github.com/mainmatter/ember-formatjs/blob/main/README.md) to transform code at build time.

::: code-group

```gts [app/templates/application.gts]{4}
import { t } from 'ember-intl';

<template>
  {{t "tBFOH1" name="Zoey"}}
</template>
```

:::
