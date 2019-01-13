
Compact Decimal Formatting API
==============================================================================

ember-intl ships with the ability to short format a number.  For example, `123,000` can be
converted to `123K` in English or `12万` in Japanese.

This ability depends on data from [cldr-numbers-full](https://github.com/unicode-cldr/cldr-numbers-full) and the functionality
extracted to [cldr-compact-number](https://github.com/snewcomer/cldr-compact-number).  API formatting options can be found [here](https://github.com/snewcomer/cldr-compact-number#usage).

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
    twoDigits: {
      significantDigits: 2
    }
  }
};
```

```yaml
product: 'The product has {reviews, shortNumber, zeroDigits} reviews'
```

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


```yaml
product: 'The product has {reviews, shortNumber, twoDigits} reviews'
```
```js
this.get('intl').t('product', {
  reviews: 19634
});
```

English

> The product has 19.64K reviews

Japanese

> The product has 1.96万 reviews

Spanish

> The product has 19,64 mil reviews
