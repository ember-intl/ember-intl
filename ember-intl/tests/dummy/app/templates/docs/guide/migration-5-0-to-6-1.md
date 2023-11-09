# Migrating from 5.0 to 6.1

Over 3 years passed since `5.0.0` had been released on May 2020. Unfortunately, whether the merged pull requests resulted in a feature, bug fix, or breaking change hasn't been documented well. (We will do a better job going forward.)

The lists below describe what you may encounter when updating `ember-intl` from `5.7.2`, the last stable release. If there is a missing item, please create a pull request to help complete this page.

Note, `6.0.0` had been released by accident and isn't a stable version. Version `6.1.0` marks the beginning of the `6.x` series.


## Breaking changes

### Minimum requirements

The following versions are supported:

- Ember 3.28 or above
- Node 16 or above
- TypeScript 4.8 or above

In addition, `ember-auto-import@v2` is required.

Note, as of September 12, 2023, the wider ecosystem may decide to not support Ember 3.28 and Node 16. Likely, `ember-intl@v7` will support Ember 4.4+ and Node 18+, so please continue to work on updating your project dependencies.


### Missing `setupIntl()` results in a runtime error

If a rendering test (also called an integration test) depends on `ember-intl` (e.g. because you used the `{{t}}` helper in the template, injected the `intl` service in the backing class, or rendered another component that depends on `ember-intl`), then you must add `setupIntl()` to your test. Otherwise, you will encounter the runtime error,

```sh
You attempted to update `_locale` on ..., but it had already been used previously in the same computation.
```

The fix is manual. To see which tests are missing `setupIntl()`, you can run your tests (e.g. `ember test --server`) and check the error messages in the console.

```diff
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
+ import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | my-component', function (hooks) {
  setupRenderingTest(hooks);
+   setupIntl(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<MyComponent />`);

    assert.ok(true);
  });
});
```


### Missing `other` clause results in a build error

If a translation defines rules for pluralization, then it must have the `other` clause. Otherwise, you will see the build error,

```sh
Build Error (TranslationReducer)

An error occurred (MISSING_OTHER_CLAUSE) when extracting ICU arguments for ...
```

The fix is manual. Find translations with the keyword `plural`, then define the `other` clause.

```diff
- message: You have {itemCount, plural, =0 {no items} one {# item}}.
+ message: You have {itemCount, plural, =0 {no items} one {# item} other {# items}}.
```


### Renamed the re-exported `intl` service

In version `5.5.0`, the `intl` service class had been re-exported in the "root" file (the `index` file). However, the re-exported class' name, `Service`, collides with the name of the `Service` class from `@ember/service`.

To prevent developers from using the wrong `Service` class and help auto-completes suggest the correct import path, the re-exported class is now named `IntlService`.

```diff
- import { Service } from 'ember-intl';
+ import Service from '@ember/service';

this.owner.register('service:api', class ApiService extends Service {
  // ...
});
```


## Features

### Dynamically set named arguments

Version `6.0.0-beta.3` introduced the ability to dynamically set named arguments. You can pass an object (a POJO) to the first positional argument.

```hbs
{{t "say.hello" @user}}
```

For more information, visit [Named and Positional Arguments](../helpers/t#named-and-positional-arguments).


### Glint support

Version `6.0.0-beta.5` added the template registry to support [Glint](https://typed-ember.gitbook.io/glint/) users. If you have used [`@gavant/glint-template-types`](https://github.com/Gavant/glint-template-types/tree/v0.3.6/types/ember-intl/helpers) to type the `ember-intl` helpers, you may be able to simplify your project setup.

```ts
import '@glint/environment-ember-loose';

import type EmberIntlRegistry from 'ember-intl/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberIntlRegistry, /* other addon registries */ {
    // local entries
  }
}
```

Note, in continuous integration, the types for `6.1.0` are tested against `@glint/environment-ember-loose@0.9.7`. We'll want to test against the latest `@glint/environment-ember-loose@1.x` soon. Please open an issue if the registry doesn't work with the `1.x` series.


### Two simple ways to type the `intl` service

Version `5.5.0` introduced TypeScript support. You might have retrieved the type `IntlService` from `ember-intl/services/intl`, a path that is rather long to remember.

```ts
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type IntlService from 'ember-intl/services/intl';

export default class MyComponent extends Component {
  @service declare intl: IntlService;

  // ...
}
```

Starting with `6.1.0`, `ember-intl` will recommend importing the type in one of 2 ways. Either you can import it from the "root" file (the `index` file),

```ts
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type { IntlService } from 'ember-intl';

export default class MyComponent extends Component {
  @service declare intl: IntlService;

  // ...
}
```

or use the service registry,

```ts
import { service, type Registry as Services } from '@ember/service';
import Component from '@glimmer/component';

export default class MyComponent extends Component {
  @service declare intl: Services['intl'];

  // ...
}
```

The latter pattern may be preferred, if you need to inject multiple services and want to avoid having many import statements.


