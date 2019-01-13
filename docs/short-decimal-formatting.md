
Compact Decimal Formatting API
==============================================================================

ember-intl ships with the ability to short format a number.  For example, `123,000` can be
converted to `123K` in English or `12万` in Japanese.

This ability depends on data from [cldr-numbers-full](https://github.com/unicode-cldr/cldr-numbers-full) and the functionality
extracted to [cldr-compact-number](https://github.com/snewcomer/cldr-compact-number).

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

Outputs:

> The product has 19.6K reviews

In Japanese the output would be

> The product has 2万 reviews

In Spanish the output would be

> The product has 19,6 mil reviews


Or you can specify multiple output formats:

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

Outputs:

> The product has 19K reviews

In Japanese the output would be

> The product has 2万 reviews

In Spanish the output would be

> The product has 19 mil reviews


```yaml
product: 'The product has {reviews, shortNumber, twoDigits} reviews'
```
```js
this.get('intl').t('product', {
  reviews: 19634
});
```

Outputs:

> The product has 19.64K reviews

In Japanese the output would be

> The product has 1.96万 reviews

In Spanish the output would be

> The product has 19,64 mil reviews
