# Addon support

**Warning: This page pertains to v1 addons and may be outdated. The described feature may not be supported in v2 addons.**


## treeForTranslations

In v3.0.0, a hook called `treeForTranslations` was introduced to support addons better.

The behavior is that every addon that implements a `treeForTranslations` hook will be invoked at build time. If an addon does not implement a `treeForTranslations` but instead has a `/translations` folder then the contents of the folder will be used.

An example use-case of this hook would be programmatically fetching translations at build time from a third-party service. If you create a broccoli plugin that you think will be useful for others, submit a PR to add to the documentation!

```js
// index.js
module.exports = {
  name: 'an-ember-addon',

  /**
   * NOTE: addon's translation tree provided as an arg.
   * No need to return it if you are reimplementing behavior.
   * If you want to programmatically modify the translation node,
   * then feel free to mutate the passed in tree and return it.
   */
  treeForTranslations(/* tree */) {
    return new BroccoliTranslationPlugin();
  }
};
```
