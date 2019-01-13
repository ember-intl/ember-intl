
Compact Decimal Formatting API
==============================================================================

ember-intl ships with the ability to short format a number.  For example, `123,000` can be
converted to `123K` in English or `12万` in Japanese.

## How to compact format a number

```yaml
product: 'The product has {reviews, shortNumber} reviews'
```

```js
// app/formats.js
export default {
  shortNumber: {
    zeroDigit: {
      significantDigits: 0
    },
    oneDigit: {
      significantDigits: 1
    }
  }
};
```

```js
this.get('intl').t('product', {
  reviews: 1200
});
```

Outputs:

> The product has 1K reviews

