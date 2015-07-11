function TranslationLookup (translation, locale) {
    if (arguments.length < 2) {
        throw new Error('Translation and associated locale name is required');
    }

    this.translation = translation;
    this.locale = locale;
}

export default TranslationLookup;
