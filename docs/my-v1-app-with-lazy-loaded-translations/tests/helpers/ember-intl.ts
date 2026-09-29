type Locale = 'de-de' | 'en-us';

export function loadTranslations(hooks: NestedHooks): void {
  hooks.beforeEach(async function () {
    const intl = this.owner.lookup('service:intl');

    async function load(locale: Locale): Promise<void> {
      const { default: file } = (await import(
        `/translations/${locale}.json`
      )) as {
        default: string;
      };
      const translations = JSON.parse(file) as Record<string, string>;

      intl.addTranslations(locale, translations);
    }

    await Promise.allSettled([load('de-de'), load('en-us')]);
  });
}
