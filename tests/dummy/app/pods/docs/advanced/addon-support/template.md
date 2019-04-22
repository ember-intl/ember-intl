# Addon support

By default, addons are supported out of the box. They simply need to implement a `/translations` folder at the root of your project (NOTE: a sibling to `app` _not_ a child) then the contents of the translation folder will be bundled with the translations of your host app.

## Advanced Usage (treeForTranslations)

As of 3.0.0, a new hook called `treeForTranslations` was introduced for better addon support.

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
  treeForTranslations(/*tree*/) {
    return new BroccoliTranslationPlugin();
  }
};
```

## Overriding Translations

The host application can always override addon translations. If the application implements a key that collides with an addon, then the application wins when bundling the translations. This is intended to allow host applications to override translations w/o having to modify an addon.
