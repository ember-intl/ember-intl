# no-missing-keys

## Why use it?

The rule finds missing translation keys. In other words, keys that are used in the source code, but aren't defined in a translation file (neither in yours nor an addon's).


## Options for `lintRules`

### ignores

Ignore keys that fail this rule.

```js
'no-missing-keys': {
  ignores: ['hello.message'],
},
```
