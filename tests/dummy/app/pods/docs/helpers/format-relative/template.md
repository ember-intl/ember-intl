{{locale-switcher}}
# Format Relative

Formats dates relative to "now" using [<code>Intl.RelativeTimeFormat</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat), and returns the formatted string value.

{{format-relative -1 unit="day"}}

```hbs
{{format-relative -1 unit="day"}}
```

{{format-relative 1 unit="day"}}

```hbs
{{format-relative 1 unit="day"}}
```

{{format-relative 0 unit="day"}}

```hs
{{format-relative 0 unit="day"}}
```

## Format Relative Options

`style`

> options for "best fit" ("yesterday") and "numeric" ("1 day ago") output.

`units`

> options for always rendering in a particular unit; e.g. "30 days ago",
> instead of "1 month ago".

# TODO: implement complete list

By default, the relative time is computed to the best fit unit, but you can explicitly call it to force units to be displayed in `"second"`, `"second-short"`, `"minute"`, `"minute-short"`, `"hour"`, `"hour-short"`, `"day"`, `"day-short"`, `"month"`, `"month-short"`, `"year"` or `"year-short"`
