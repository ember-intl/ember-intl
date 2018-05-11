
Translating Text
==============================================================================

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

The `t` helper, as of 3.0.0, supports a fallback lookup if the primary translation key is missing.  In the below example, the translation key `"actual_key"` would be used in place of the primary key, `"missing_key"`, if translation missing for key.

```hbs
{{t 'missing_key' default='actual_key'}}
```

```js
this.intl.t('missing_key', {
  default: ['does_not_exist', 'does_exist'] /* default can also be an Array */
});
```
## Computed Property Macro

`translationMacro` defines a computed property macro that makes it easy to
define translated computed properties. For example,

```js
import { translationMacro as t } from 'ember-intl';

export default Ember.Component.extend({
  // You'll need to inject the service into
  // what object will own these computed macros
  intl: Ember.inject.service(),

  // A simple translation.
  title: t('user.edit.title'),

  followersCount: 1,

  // A translation with interpolations. This computed property
  // depends on `count` and will send `{ count: this.get('followersCount') }`
  // in to the translation.
  followersTitle: t('user.followers.title', { count: 'followersCount' })
});
```

The first argument is the translation key. The second is a hash where the keys
are interpolations in the translation and the values are paths to the values
relative to this.

The macro relies on `this.get('intl')` being the `service:intl.

_This feature is a direct port of ember-i18n's `translationMacro`._
