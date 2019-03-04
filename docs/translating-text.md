# Translating Text

## Translate

```hbs
<h2 id="title">{{t 'hello.world'}}</h2>
```

### HTML Element Attributes

```hbs
<input type='email' value='Some value' placeholder={{t 'hello.world'}}>
```

### Helper/Component Attributes

```hbs
{{input value=email placeholder=(t 'hello.world')}}
```

### Fallback Translations

The `t` helper, as of 3.0.0, supports a fallback lookup if the primary translation key is missing. In the below example, the translation key `"actual_key"` would be used in place of the primary key, `"missing_key"`, if translation missing for key.

```hbs
{{t 'missing_key' default='actual_key'}}
```

```js
this.intl.t('missing_key', {
  default: ['does_not_exist', 'does_exist'] /* default can also be an Array */
});
```

## Computed Property Macros

### t

`t` is a computed property macro that makes it easy to define translated
computed properties. For example:

```js
import Component from '@ember/component':
import { t } from 'ember-intl';

export default Component.extend({
  // Injecting the service is not required for `t` to work.
  // intl: service(),

  // A simple translation.
  title: t('user.edit.title'),

  followersCount: 1,

  // A translation with interpolations. This computed property
  // depends on `count` and will send `{ count: this.followersCount }`
  // in to the translation.
  followersTitle: t('user.followers.title', { count: 'followersCount' })
});
```

The first argument is the translation key. The second is a hash where the keys
are interpolations in the translation and the values are paths to the values
relative to this.

If you want to pass static values instead of paths to dynamic value, you can use
the `raw` function like in
[`ember-macro-helpers`](https://github.com/kellyselden/ember-macro-helpers#raw).

```js
import Component from '@ember/component':
import { t, raw } from 'ember-intl';

export default Component.extend({
  userName: 'Tom',

  // A translation with dynamic and static values
  title: t('user.edit.title', { name: 'userName', brand: raw('Ember') })
});
```

Note: Even though `raw` is _named_ the same as in `ember-awesome-macros` /
`ember-macro-helpers`, they _are not_ the same. Be sure to always use the
correct `raw` with `ember-intl` and `ember-awesome-macros` / `ember-macro-helpers`.

### intl

`intl` is the underlying computed property macro for `t` and you can use it
directly to access other methods from the `intl` service. It looks like this:

```js
import Component from '@ember/component':
import { intl } from 'ember-intl';

export default Component.extend({
  now: new Date(),
  dateFormat: 'hhmmss',

  nowFormatted: intl('now', 'dateFormat', function(intl /* , propertyKey, instance */) {
    return intl.formatDate(this.now, { format: this.format });
  })
});
```

`intl` expects a list of dependent keys, which may be empty, and the computed
property getter method as the last argument. The getter method receives three
arguments:

- `intl`: The `intl` service.
- `propertyKey`: The name of the computed property. In the above example it
  would be `nowFormatted`.
- `instance`: The class instance the computed property is installed on. This is
  equivalent to `this` in the above example. The reason `instance` is also
  passed to the getter method is to allow terser arrow function syntax instead
  of the `function` keyword:

  ```js
  intl('now', (intl, key, instance) => intl.formatDate(instance.now, { format: 'hhmmss' }));
  ```
