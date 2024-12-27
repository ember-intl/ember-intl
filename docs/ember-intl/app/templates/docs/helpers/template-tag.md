# &#60;template&#62; tag

You can use the helpers from `ember-intl` in a [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports). The helpers have a camel-cased name and can be imported from the `index` file.

```ts
import {
  formatDate,
  formatDateRange,
  formatList,
  formatMessage,
  formatNumber,
  formatRelative,
  formatTime,
  t,
} from 'ember-intl';

const today = new Date();

// Some examples
<template>
  {{formatDate today}}

  {{formatNumber 12345}}

  {{t "hello.message"}}
</template>
```
