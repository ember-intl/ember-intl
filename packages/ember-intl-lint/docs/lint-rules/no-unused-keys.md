# no-unused-keys

## Why use it?

The rule finds unused translation keys. In other words, keys that are defined in a translation file (in yours), but aren't used in the source code.


## Options for `lintRules`

### ignores

Ignore keys that fail this rule.

```js
'no-unused-keys': {
  ignores: ['hello.message'],
},
```
