function isValidLocaleFormat(locale) {
  if (!/^[a-zA-Z0-9-]+$/.test(locale)) {
    return false;
  }

  return true;
}

module.exports = isValidLocaleFormat;
