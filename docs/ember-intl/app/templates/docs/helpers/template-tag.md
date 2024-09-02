# &#60;template&#62; tag

`ember-intl` is compatible with [ember-template-imports](https://github.com/ember-template-imports/ember-template-imports) and you can use all helpers by importing them from the index file like so:

```gjs
import { formatNumber } from 'ember-intl';

<template>
  {{formatNumber 12345}}
</template>
```
