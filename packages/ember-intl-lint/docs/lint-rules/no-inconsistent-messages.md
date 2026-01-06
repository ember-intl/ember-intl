# no-inconsistent-messages

## Why use it?

The rule finds translation keys whose message is "inconsistent" across the translation files (yours).

A message is consistent if it meets these conditions:

- If a translation file has the key, the message uses the same set of ICU arguments.
- Every translation file defines the key.


## Options for `lintRules`

### ignores

Ignore keys that fail this rule.

```js
'no-inconsistent-messages': {
  ignores: ['hello.message'],
},
```
