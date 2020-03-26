# Overview

## What is Ember-Intl?

Ember-intl is an internationalization addon that unlocks **translating simple to complex messages** using built-in **pluralization rules**, **number and datetime formatting**, with support for **over 150 languages**

Ember-intl is now entirely built on native [ECMAScript Internationalization APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) that are now supported by [all modern browsers](https://caniuse.com/#feat=internationalization).

## Notable Features

* 💵 Locale-aware numbers: currencies, decimals, and percentages
* 📅 Locale-aware date and time formatting
* 🕑 Locale-aware display of relative time. i.e, `"in 1 day"`, `"2 years ago"`, etc.
* 💬 Translations containing fragments of any of the above

```icu
Sale begins {start, date, medium}
```

also built-in pluralization:

```icu
You have {itemCount, plural,
    =0 {no items}
    one {# item}
    other {# items}
}
```

* 🌐 Support for 150+ languages.
* 📜 Built on standards such as the [ICU message syntax](https://formatjs.io/guides/message-syntax/) & [Native Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
* ⚡ Extensive Ember Service API and template helpers for formatting and translating.
* 🎉 {{docs-link 'Advanced addon support' 'docs.advanced.addon-support'}} to provide translations to the host app

## Online Community Chat
Join the `topic-i18n` channel [here](https://discordapp.com/invite/zT3asNS) to ask questions and chat with community members in real-time.


