type TranslationJson = {
  [key: TranslationKey]: TranslationJson | TranslationMessage;
};

type TranslationKey = string;

type TranslationMessage = string;

declare module 'virtual:ember-intl/translations/*' {
  const translations: TranslationJson;
  export default translations;
}
