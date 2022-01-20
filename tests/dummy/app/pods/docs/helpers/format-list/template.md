{{locale-switcher}}
# Format List

Format a list of string into a single value.

{{format-list this.example}}

```hbs
{{format-list this.example}}
```

{{format-list this.example type='disjunction'}}

```hbs
{{format-list this.example type='disjunction'}}
```

## Format List Options
`localeMatcher`

> The locale matching algorithm to use. Possible values are "lookup" and
> "best fit"; the default is "best fit". For information about this option,
> see the Intl page.

`type`

> The format of output message. Possible values are "conjunction" that stands for "and"-based lists (default, e.g., "A, B, and C"), or "disjunction" that stands for "or"-based lists (e.g., "A, B, or C"). "unit" stands for lists of values with units (e.g., "5 pounds, 12 ounces").


`style`

> The length of the formatted message. Possible values are: "long" (default, e.g., "A, B, and C"); "short" (e.g., "A, B, C"), or "narrow" (e.g., "A B C"). When style is "short" or "narrow", "unit" is the only allowed value for the type option.