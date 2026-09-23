# no-inconsistent-messages

## Why use it?

The rule finds translation keys whose message is "inconsistent" across locales.

A message is consistent if it meets these conditions:

- If a locale has the key, the message uses the same set of ICU arguments.
- Every locale defines the key.


## Options for `lintRules`

### ignores

Ignore keys that fail this rule. You can use strings to do an exact match, or regular expressions to do a partial match.

```js
'no-inconsistent-messages': {
  ignores: ['hello.message'],
},
```
