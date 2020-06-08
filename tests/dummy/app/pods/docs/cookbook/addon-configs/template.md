
# Addon Configs

## Filter Locales

If you need to distribute applications separately in different languages, now we can use `includeLocales` or `excludeLocales` configuration options.

```
// config/ember-intl.js
{
  includeLocales: ['en-us', 'zh-cn'],
  ...
}
```

*Note, If you set both `includeLocales` and `excludeLocales` options, the `excludeLocales`  wins!*


