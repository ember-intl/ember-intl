# Intl.js Polyfill

As of 2019, the Intl API ships with every everygreen browser.  As of ember-intl@5, we no longer bundle the polyfill.

If your application requires legacy browser support, you'll need to polyfill the missing browser API.


[intl.js polyfill]: https://github.com/andyearnshaw/Intl.js/

## Polyfill.io

Intl.js polyfill was recently added to the [Polyfill.io service][polyfill service], which is
developed and maintained by a community of contributors led by a team at the
[Financial Times](http://www.ft.com/). It is available thru `cdn.polyfill.io`
domain, which routes traffic through [Fastly](http://www.fastly.com/), which
makes it available with global high availability and superb performance no
matter where your users are.

To use the Intl polyfill thru the [Polyfill.io service][polyfill service], you can install
[`ember-cli-polyfill-io`][ember-cli-polyfill-io] which will add the appropriate `<script>` tag to
your Ember app.

When specifying the `features` to use thru the polyfill service, you have to
specify what locale, or locales, to load along with the Intl polyfill for the
page to function:

```javascript
// config/environment.js

module.exports = function(environment) {
  var ENV = {
    // ...
    'polyfill-io': {
      features: ['Intl.~locale.en-US', 'Intl.~locale.fr-FR', 'Intl.~locale.es-ES']
    }
  };

  // ...

  return ENV;
};
```

_Note: the example above will load the polyfill with three locale data set,
`fr-FR`, `en-US`, and `es-ES`._

This is by far the best option to use the Intl polyfill since it will only
load the polyfill code and the corresponding locale data when it is really
needed (e.g.: safari will get the code and patch the runtime while chrome
will get an empty script tag).

[polyfill service]: https://cdn.polyfill.io/v2/docs/
[ember-cli-polyfill-io]: https://github.com/alexlafroscia/ember-cli-polyfill-io
