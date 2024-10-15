import { isHTMLSafe, type SafeString } from '@ember/template';

const escaped: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;',
};
const needToEscape = /[&<>"'`=]/;
const badCharacters = /[&<>"'`=]/g;

// https://github.com/emberjs/ember.js/blob/v5.8.0/packages/%40ember/-internals/glimmer/lib/utils/string.ts#L103-L118
function escapeExpression(value: string): string {
  if (!needToEscape.test(value)) {
    return value;
  }

  return value.replace(badCharacters, (character: string) => {
    return escaped[character]!;
  });
}

/**
 * @private
 * @hide
 */
export function escapeFormatMessageOptions<T extends Record<string, any>>(
  options: T,
) {
  const escapedOptions = {} as {
    [K in keyof T]: T[K] extends SafeString ? string : T[K];
  };

  for (const [key, value] of Object.entries(options)) {
    let newValue;

    if (isHTMLSafe(value)) {
      /*
        Cast `value`, an instance of `SafeString`, to a string
        using `.toHTML()`. Since `value` is assumed to be safe,
        we don't need to call `escapeExpression()`.
      */
      newValue = value.toHTML();
    } else if (typeof value === 'string') {
      newValue = escapeExpression(value);
    } else {
      newValue = value;
    }

    // @ts-expect-error: Type not specific enough
    escapedOptions[key] = newValue;
  }

  return escapedOptions;
}
