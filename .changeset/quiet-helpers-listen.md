---
"@ember-intl/lint": minor
"@ember-intl/utils": minor
"ember-intl": patch
---

Added the `lintOptions.dependencies` option. This option lets the linter recognize whichever translation function the config names, so it is no longer hard-coupled to ember-intl's own `t`.

```js
export default {
  lintOptions: {
    dependencies: [{ importName: 't', importPath: 'my-app/utils/intl' }],
  },
};
```

ember-intl's own `t`, `tKey` and the `intl` service stay recognized.
