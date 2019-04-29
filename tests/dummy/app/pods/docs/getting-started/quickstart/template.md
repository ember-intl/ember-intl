# Quickstart

## 1. Install ember-intl

```bash
ember install ember-intl
```

This will create the following files:

* `app/format.js`
    <!-- default definitions of named formats -->
* `config/ember-intl.js`
    <!-- default ember-intl settings -->
* `translations/en-us.yaml`

## 2. Add your first translation

Create a translation key in `translations/en-us.yaml`

```yaml
# translations/en-us.yaml
hello:
  world: Hello World!
```
In a template add the following:
```hbs
<!-- app/templates/application.hbs -->
<h1>{{t "hello.world"}}</h1>

{{outlet}}
```

## 3. Add a new language

Create a new translation file: `translations/fr-fr.yaml`

```
# translations/fr-fr.yaml
hello:
  world: "Bonjour tout le monde!"
```

## 4. Configure ember-intl

**Setup your application-wide locale**

You will need to define what locale your app will use by default. This can be done at any point after your app boots. This is typically done within your Application route's `beforeModel` hook by calling `intl.setLocale('en-us')`.

```js
// app/routes/application.js
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  intl: service(),
  beforeModel() {
    this._super(...arguments);
    return this.intl.setLocale('en-us');
  }
});
```

**Configure your template linter**

If your app uses `ember-cli-template-lint` (which is installed by default since ember-cli v3.4.1),
it is strongly recommanded that you add the `no-bare-strings` rule to your template linter.
This rule will prevent you from using plain text strings in your templates (because they cannot be translated).

To enabled the template linter rule, edit the file `.template-lintrc.js` as follow:

```js
// .template-lintrc.js
'use strict';

module.exports = {
  extends: 'recommended',

    rules: {
    'no-bare-strings': true
  }
};
```
