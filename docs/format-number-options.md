
Format Number Options
==============================================================================

`localeMatcher`

> The locale matching algorithm to use. Possible values are "lookup" and
> "best fit"; the default is "best fit". For information about this option,
> see the Intl page.

`style`

> The formatting style to use. Possible values are "decimal" for plain number
> formatting, "currency" for currency formatting, and "percent" for percent
> formatting; the default is "decimal".

`currency`

> The currency to use in currency formatting. Possible values are the ISO 4217
> currency codes, such as "USD" for the US dollar, "EUR" for the euro, or
> "CNY" for the Chinese RMB — see the Current currency & funds code list.
> There is no default value; if the style is "currency", the currency property
> must be provided.

`currencyDisplay`

> How to display the currency in currency formatting. Possible values are
> "symbol" to use a localized currency symbol such as €, "code" to use the
> ISO currency code, "name" to use a localized currency name such as "dollar";
> the default is "symbol".

`useGrouping`

> Whether to use grouping separators, such as thousands separators or
> thousand/lakh/crore separators. Possible values are true and false;
> the default is true.

----

The following properties fall into two groups: 

- `minimumIntegerDigits`, `minimumFractionDigits`, `maximumFractionDigits`
- `minimumSignificantDigits`, `maximumSignificantDigits`

If at least one property from the second group is defined, then the first
group is ignored.


`minimumIntegerDigits`

> The minimum number of integer digits to use. Possible values are from
> 1 to 21; the default is 1.

`minimumFractionDigits`

> The minimum number of fraction digits to use. Possible values are from
> 0 to 20; the default for plain number and percent formatting is 0; the
> default for currency formatting is the number of minor unit digits provided
> by the ISO 4217 currency code list (2 if the list doesn't provide that
> information).

`maximumFractionDigits`

> The maximum number of fraction digits to use. Possible values are from
> 0 to 20; the default for plain number formatting is the larger of
> `minimumFractionDigits` and 3; the default for currency formatting is the
> larger of `minimumFractionDigits` and the number of minor unit digits
> provided by the ISO 4217 currency code list (2 if the list doesn't provide
> that information); the default for percent formatting is the larger of
> `minimumFractionDigits` and 0.

`minimumSignificantDigits`

> The minimum number of significant digits to use. Possible values are from
> 1 to 21; the default is 1.

`maximumSignificantDigits`

> The maximum number of significant digits to use. Possible values are
> from 1 to 21; the default is `minimumSignificantDigits`.
