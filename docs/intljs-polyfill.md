
Intl.js Polyfill
==============================================================================

Ember Intl automatically pushes the [Intl.js polyfill][] to your `/assets`
folder.  Using the polyfill is not required if targeting a modern set of
browsers which natively implement the Intl API.

[Intl.js polyfill]: https://github.com/andyearnshaw/Intl.js/

## Loading files from assets

Add the following tags to your index.html, or any mechanism in which you serve
your your application payload.  Note: these script tags should be set above
the application's script tag.

```html
<script src="{{rootURL}}assets/intl/intl.min.js"></script>
<script src="{{rootURL}}assets/intl/locales/en-us.js"></script>
<script src="{{rootURL}}assets/intl/locales/fr-fr.js"></script>
<script src="{{rootURL}}assets/intl/locales/es-es.js"></script>
<!--
You can view the full list of CLDR locales which can be accessed from the `/assets/intl` folder
of your application.  The CLDRs are automatically placed there at build time.  Typically this folder
on your filesystem is ``<project>/dist/assets/intl`

Full list: https://github.com/yahoo/formatjs-extract-cldr-data/tree/master/data/main
-->
```

### Cherry pick CLDR modules

At build time, we copy roughly 700 files, totaling 18mb, to the asset folder.
Don't worry, this does not add weight to your app or vendor files. The only
penalty you incur is at build time with the ember-cli build pipeline. Since
most applications support only a subset of the locales we support, you can
specify the locales in `config/environment.js` to optimize only copying the
files needed.

```js
module.exports = function() {
  return {
    intl: {
      locales: ['en-us', 'fr-fr']
    }
  };
};
```

In this case, `en-us.js` and `fr-fr.js` will be copied to
`/assets/intl/locales` on build.

### Change output path

```js
// ember-cli-build.js
var app = new EmberApp({
  app: {
    intl: '/assets/intl' // default
  }
});
```

### Disabling

```js
// config/environment.js
module.exports = function() {
  return {
    intl: {
      disablePolyfill: true
    }
  };
};
```

## Polyfill.io

Intl.js polyfill was recently added to the [Polyfill.io service][Polyfill service], which is
developed and maintained by a community of contributors led by a team at the
[Financial Times](http://www.ft.com/). It is available thru `cdn.polyfill.io`
domain, which routes traffic through [Fastly](http://www.fastly.com/), which
makes it available with global high availability and superb performance no
matter where your users are.

To use the Intl polyfill thru the [Polyfill.io service][Polyfill service], you can install
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
      features: [
        'Intl.~locale.en-US',
        'Intl.~locale.fr-FR',
        'Intl.~locale.es-ES'
      ]
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

[Polyfill service]: https://cdn.polyfill.io/v2/docs/
[ember-cli-polyfill-io]: https://github.com/alexlafroscia/ember-cli-polyfill-io
