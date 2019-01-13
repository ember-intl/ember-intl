Compact Decimal Formatting API
==============================================================================

ember-intl ships with the ability to short format a number.  For example, `123,000` can be
converted to `123K` in English or `12万` in Japanese.

This functionality depends on data from [cldr-numbers-full](https://github.com/unicode-cldr/cldr-numbers-full) and has been extracted
to [cldr-compact-number](https://github.com/snewcomer/cldr-compact-number).  API formatting options can be found [here](https://github.com/snewcomer/cldr-compact-number#usage).

## How to short format a number

```yaml
product: 'The product has {reviews, shortNumber} reviews'
```

```js
// app/formats.js
export default {
  shortNumber: {
    significantDigits: 1
  }
};
```

```js
this.get('intl').t('product', {
  reviews: 19634
});
```

English

> The product has 19.6K reviews

Japanese

> The product has 2万 reviews

Spanish

> The product has 19,6 mil reviews


### Multiple output formats

```js
// app/formats.js
export default {
  shortNumber: {
    zeroDigits: {
      significantDigits: 0
    },
    oneDigit: {
      significantDigits: 1
    },
    financialFormat: {
      significantDigits: 1,
      financialFormat: true
    }
  }
};
```

```yaml
product: 'The product has {reviews, shortNumber, zeroDigits} reviews'
```

Zero Significant Digits

```js
this.get('intl').t('product', {
  reviews: 19634
});
```

English

> The product has 19K reviews

Japanese

> The product has 2万 reviews

Spanish

> The product has 19 mil reviews


One Significant Digits in Financial Format

```yaml
product: 'This investment product has {trades, shortNumber, financialFormat} trades'
```
```js
this.get('intl').t('product', {
  reviews: 101000
});
```

English

> This investment product has 0.1M trades

Japanese

> This investment product has 10.1万 trades

Spanish

> This investment product has 0,1M trades
