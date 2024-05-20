const optionsToIgnore = new Set(['htmlSafe', 'locale']);

/**
 * Replaces the `{` and `}` characters with `(` and `)` so that these
 * aren't interpreted as variables.
 *
 * Replaces the `\"` characters with `"` to allow additional escapes.
 * See https://github.com/ember-intl/ember-intl/issues/1035.
 */
function replaceInterpolators(input: string): string {
  return String(input)
    .replace(/\{/g, '(')
    .replace(/\}/g, ')')
    .replace(/\\"/g, '"');
}

function stringify(object: Record<string, unknown>): string {
  return JSON.stringify(object, Object.keys(object).sort());
}

function stringifyOptions(options?: Record<string, unknown>): string {
  const filteredOptions: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(options ?? {})) {
    if (optionsToIgnore.has(key)) {
      continue;
    }

    filteredOptions[key] = value;
  }

  return replaceInterpolators(stringify(filteredOptions));
}

/**
 * Returns the key and options in a way that helps end-developers
 * write tests.
 *
 * @private
 * @hide
 */
export function onMissingTranslation(
  key: string,
  _locales: string[],
  options?: Record<string, unknown>,
) {
  return `t:${key}:${stringifyOptions(options)}`;
}
