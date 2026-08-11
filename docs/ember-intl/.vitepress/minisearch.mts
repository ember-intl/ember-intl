import type { DefaultTheme } from 'vitepress/theme';

/*
  MiniSearch's default tokenizer splits on whitespace and punctuation only, so
  an API name like `formatDateRange` is indexed as a single term. We split
  camelCase names as well, so that someone who searches for "date range" or
  "primary locale" lands on the same pages that `formatDateRange` and
  `primaryLocale` do.
*/
const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}]+/u;

const CAMEL_CASE_BOUNDARY =
  /(?<=[\p{Ll}\p{N}])(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})/u;

function tokenize(text: string): string[] {
  const tokens: string[] = [];

  for (const word of text.split(SPACE_OR_PUNCTUATION)) {
    if (word === '') {
      continue;
    }

    // Keep the whole name, so that searching for `formatDateRange` still works
    tokens.push(word);

    const parts = word.split(CAMEL_CASE_BOUNDARY);

    if (parts.length > 1) {
      tokens.push(...parts);
    }
  }

  return tokens;
}

export const miniSearch: NonNullable<
  DefaultTheme.LocalSearchOptions['miniSearch']
> = {
  options: {
    tokenize,
  },
};
