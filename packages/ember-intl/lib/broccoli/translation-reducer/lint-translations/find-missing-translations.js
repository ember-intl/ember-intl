function findMissingTranslations(key, data) {
  const { localeToKeys } = data;

  const result = [];

  for (const [locale, keys] of Object.entries(localeToKeys)) {
    if (!keys.has(key)) {
      result.push(locale);
    }
  }

  return result;
}

module.exports = findMissingTranslations;
