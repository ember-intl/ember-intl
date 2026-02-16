---
title: \<template> tag
---

# &#60;template&#62; tag {#template-tag} #

You can use `ember-intl`'s helpers in a `<template>` tag. Every helper has a camel-cased name and can be name-imported from the barrel file (the `index` file).

```gts
import {
  formatDate,
  formatDateRange,
  formatList,
  formatMessage,
  formatNumber,
  formatRelativeTime,
  formatTime,
  t,
  tKey,
} from 'ember-intl';

const today = new Date();

// Some examples
<template>
  {{formatDate today}}

  {{formatNumber 12345}}

  {{t "hello.message"}}
</template>
```

> [!NOTE]
>
> In older projects, you will need to install [`ember-template-imports`](https://github.com/ember-cli/ember-template-imports) to use the `<template>` tag in components and tests, and [`ember-route-template`](https://github.com/discourse/ember-route-template) to use it in routes.
> 
> `ember-template-imports` can be uninstalled in these cases:
>
> - Your app runs on `@embroider/core@4.x` or above. Currently, `v4` only supports v2 apps.
> - Your addon is a v2 addon.
>
> `ember-route-template` can be uninstalled in these cases:
>
> - Your app runs on `ember-source@6.3` or above.
