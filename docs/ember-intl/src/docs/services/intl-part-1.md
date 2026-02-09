# intl (Part 1)

As mentioned in [Services - Introduction](./introduction), the `intl` service lets you use `ember-intl`'s API in any class. Start by injecting the `intl` service.

::: code-group

```gts [app/components/example.gts]{5}
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';

export default class Example extends Component {
  @service declare intl: Services['intl'];
}
```

:::

In Part 1, we'll focus on the API that you will frequently use. Every method listed below has a [corresponding helper](../helpers/introduction). You can check its documentation for more examples.


## Methods

Every `format*` method returns an empty string when the input value(s) is `undefined` or `null`. To keep this page brief, these 2 values aren't mentioned again when discussing the possible types for the input value(s).


### formatDate {#methods-format-date}

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format) to format the date part of a `Date` object.

The 1st argument `value` is required and expects a `Date`, `number` (Unix timestamp), or `string` (ISO 8601). You can pass options for `Intl.DateTimeFormat` in the 2nd argument.

```ts {:no-line-numbers}
const output = this.intl.formatDate('2014-01-23T18:00:44');
// '1/23/2014'
```


### formatDateRange {#methods-format-date-range}

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange) to format a date range.

The 1st and 2nd arguments, `from` and `to`, are required and expect a `Date`, `number` (Unix timestamp), or `string` (ISO 8601). You can pass options for `Intl.DateTimeFormat` in the 3rd argument.

```ts {:no-line-numbers}
const date1 = new Date('2014-01-23T18:00:44');
const date2 = new Date('2014-01-26T19:30:34');

const output = this.intl.formatDateRange(date1, date2);
// '1/23/2014 – 1/26/2014'
```


### formatList {#methods-format-list}

Uses [`Intl.ListFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/format) to join an array of strings.

The 1st argument `value` is required and expects a `string[]`. You can pass options for `Intl.ListFormat` in the 2nd argument.

```ts {:no-line-numbers}
const output = this.intl.formatList(['apples', 'bananas', 'oranges']);
// 'apples, bananas, and oranges'
```


### formatMessage {#methods-format-message}

Formats a string with the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/).

The 1st argument `value` is required and expects a `MessageDescriptor` or `string`. You can pass data for the message in the 2nd argument.

```ts {:no-line-numbers}
const output = this.intl.formatMessage(
  {
    defaultMessage: '{numPhotos, number} photos taken.',
    description: 'A short summary of the photoshoot from this week',
    id: 'photoshoot-short-summary',
  },
  {
    numPhotos: 3,
  },
);
// '3 photos taken.'
```

If the message has HTML and you want to render it in a template, set `htmlSafe` to `true`.

```ts {:no-line-numbers}
const output = this.intl.formatMessage(
  {
    defaultMessage: '<em>{numPhotos, number} photos taken.</em>',
    description: 'A short summary of the photoshoot from this week',
    id: 'photoshoot-short-summary',
  },
  {
    htmlSafe: true,
    numPhotos: 3,
  },
);
// '<em>3 photos taken.</em>'
```


### formatNumber {#methods-format-number}

Uses [`Intl.NumberFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) to format a number.

The 1st argument `value` is required and expects a `bigint` or `number`. You can pass options for `Intl.NumberFormat` in the 2nd argument.

```ts {:no-line-numbers}
const output = this.intl.formatNumber(12345);
// '12,345'
```


### formatRelativeTime {#methods-format-relative-time}

Uses [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format) to format the time relative to now.

The 1st argument `value` is required and expects a `number`. You can pass options for `Intl.RelativeTimeFormat` in the 2nd argument.

```ts {:no-line-numbers}
const output = this.intl.formatRelativeTime(-1);
// '1 second ago'
```


### formatTime {#methods-format-time}

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format) to format the time part of a `Date` object.

The 1st argument `value` is required and expects a `Date`, `number` (Unix timestamp), or `string` (ISO 8601). You can pass options for `Intl.DateTimeFormat` in the 2nd argument.

```ts {:no-line-numbers}
const output = this.intl.formatTime('2014-01-23T18:00:44');
// '6:00 PM'
```


### t {#methods-t}

Finds the translation message and fills its [arguments](https://formatjs.github.io/docs/core-concepts/icu-syntax/) with the provided data.

The 1st argument `key` is required and expects a `string` (non-empty). You can pass data for the message in the 2nd argument.

```ts {:no-line-numbers}
const output = this.intl.t('hello.message', {
  name: 'Zoey',
});
// 'Hello, Zoey!'
```

If the message has HTML and you want to render it in a template, set `htmlSafe` to `true`.

```ts {:no-line-numbers}
const output = this.intl.t('visit-legal', {
  htmlSafe: true,
  url: 'https://emberjs.com/about/legal',
});
// 'See our <a href="https://emberjs.com/about/legal">Terms and Conditions</a>.'
```
