import type { DefaultTheme } from 'vitepress/theme';

function boostDocument(documentId: string, term: string): number {
  const [url, _sectionId] = documentId.split('#') as [
    string,
    string | undefined,
  ];

  const path = url.replace('/ember-intl/docs', '');

  const HELPER_PAGES: Record<string, string> = {
    formatdate: '/helpers/format-date',
    formatdaterange: '/helpers/format-date-range',
    formatdisplayname: '/helpers/format-display-name',
    formatlist: '/helpers/format-list',
    formatmessage: '/helpers/format-message',
    formatnumber: '/helpers/format-number',
    formatrelativetime: '/helpers/format-relative-time',
    formattime: '/helpers/format-time',
    t: '/helpers/t',
    tkey: '/helpers/t-key',
  };

  const helperPage = HELPER_PAGES[term.toLowerCase()];

  if (helperPage) {
    return path === helperPage ? 10 : 0;
  }

  if (path === '/') {
    return 0.5;
  }

  if (path === '/quickstart') {
    return 3;
  }

  if (path === '/quickstart-addons') {
    return 2;
  }

  if (path.startsWith('/advanced/')) {
    return 1.5;
  }

  if (path.startsWith('/helpers/')) {
    return 5;
  }

  if (path.startsWith('/migration/')) {
    return 1;
  }

  if (path.startsWith('/services/')) {
    return 3;
  }

  if (path.startsWith('/test-helpers/')) {
    return 1;
  }

  return 1;
}

function tokenize(text: string): string[] {
  /*
    MiniSearch's default tokenizer splits on whitespace and punctuation only, so
    an API name like `formatDateRange` is indexed as a single term. We split
    camelCase names as well, so that someone who searches for "date range" or
    "primary locale" lands on the same pages that `formatDateRange` and
    `primaryLocale` do.
  */
  const SPACE = /[\n\r\p{Z}]+/u;

  const PUNCTUATION = /\p{P}+/u;

  const CAMEL_CASE_BOUNDARY =
    /(?<=[\p{Ll}\p{N}])(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})/u;

  const tokens: string[] = [];

  for (const chunk of text.split(SPACE)) {
    const words = chunk.split(PUNCTUATION).filter((word) => word !== '');

    for (const word of words) {
      // Keep the whole name, so that searching for `formatDateRange` still works
      tokens.push(word);

      const parts = word.split(CAMEL_CASE_BOUNDARY);

      if (parts.length > 1) {
        tokens.push(...parts);
      }
    }

    /*
      Join what punctuation split apart, so that `format-date-range` produces
      the same `formatdaterange` token that `formatDateRange` does. Both
      spellings of a name then lead to the same page. (A user who types the
      words with a space instead, `format date range`, still gets the looser,
      word-by-word match.)
    */
    if (words.length > 1) {
      tokens.push(words.join(''));
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
  searchOptions: {
    boostDocument,
  },
};
