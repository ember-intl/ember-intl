# intl (Part 1)

As hinted in [Introduction](./introduction), the `intl` service allows you to use `ember-intl`'s API in _any_ class. Start by injecting the `intl` service.

```ts
/* components/example.ts */
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';

export default class Example extends Component {
  @service declare intl: Services['intl'];
}
```

Here, we'll focus on parts of the API that you may frequently use. Note, each of these methods has a [corresponding helper](../helpers/introduction), so please check its documentation page for more examples.


## Methods

Every `format*()` method returns an empty string when `value` (the 1st positional argument) is `undefined` or `null`. The expected types, which are mentioned below, ignore these 2 possible values to keep the documentation brief.


### formatDate()

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format) to format a date.

The 1st argument `value` is required and expects a `Date`, `number` (Unix timestamp), or `string` (ISO 8601). You can pass options for `Intl.DateTimeFormat` in the 2nd argument.

```ts
const output = this.intl.formatDate('2014-01-23T18:00:44');
// '1/23/2014'
```


### formatDateRange()

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange) to format a date range.

The 1st argument `from` and 2nd argument `to` are required and expect a `Date`, `number` (Unix timestamp), or `string` (ISO 8601). You can pass options for `Intl.DateTimeFormat` in the 3rd argument.

```ts
const date1 = new Date('2014-01-23T18:00:44');
const date2 = new Date('2014-01-26T19:30:34');

const output = this.intl.formatDateRange(date1, date2);
// '1/23/2014 – 1/26/2014'
```


### formatList()

Uses [`Intl.ListFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/format) to join an array of strings.

The 1st argument `value` is required and expects a `string[]`. You can pass options for `Intl.ListFormat` in the 2nd argument.

```ts
const output = this.intl.formatList(['apples', 'bananas', 'oranges']);
// 'apples, bananas, and oranges'
```


### formatMessage()

Formats a string with the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/).

The 1st argument `value` is required and expects a `MessageDescriptor` or `string`. You can pass data for the message in the 2nd argument.

```ts
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

If the message has HTML and you want to render it in the template, set `htmlSafe` to `true`.

```ts
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


### formatNumber()

Uses [`Intl.NumberFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) to format a number.

The 1st argument `value` is required and expects a `bigint` or `number`. You can pass options for `Intl.NumberFormat` in the 2nd argument.

```ts
const output = this.intl.formatNumber(12345);
// '12,345'
```


### formatRelativeTime()

Uses [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format) to format the time relative to now.

The 1st argument `value` is required and expects a `number`. You can pass options for `Intl.RelativeTimeFormat` in the 2nd argument.

```ts
const output = this.intl.formatRelativeTime(-1);
// '1 second ago'
```


### formatTime()

Behaves like `formatDate()`, except it focuses on the time.

The 1st argument `value` is required and expects a `Date`, `number` (Unix timestamp), or `string` (ISO 8601). You can pass options for `Intl.DateTimeFormat` in the 2nd argument.

```ts
const output = this.intl.formatTime('2014-01-23T18:00:44');
// '6:00 PM'
```


### t()

Finds the translation message corresponding to a key, then [populates the message with data](https://formatjs.github.io/docs/core-concepts/icu-syntax/) (optional).

The 1st argument `key` is required and expects a `string` (non-empty). You can pass data for the translation message in the 2nd argument.

```ts
const output = this.intl.t('hello.message', {
  name: 'Zoey',
});
// 'Hello, Zoey!'
```

If the translation message has HTML and you want to render it in the template, set `htmlSafe` to `true`.

```ts
const output = this.intl.t('ember.visit-legal', {
  htmlSafe: true,
  url: 'https://emberjs.com/about/legal',
});
// 'See our <a href="https://emberjs.com/about/legal">Terms and Conditions</a>.'
```
