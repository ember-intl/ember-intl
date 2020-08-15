import EmberObject from '@ember/object';
import Translation, { TranslationAST } from './translation';

/**
 * @private
 * @hide
 */
export default class TranslationContainer extends EmberObject {
  readonly locales: string[];

  private _translationModels: Map<string, Translation>;

  createTranslationModel(localeName: string): Translation;

  findTranslationModel(localeName: string): Translation | undefined;

  push(localeName: string, payload: Parameters<Translation['addTranslations']>[0]): void;

  has(localeName: string, key: string): boolean;

  private _lookup(localeName: string, key: string): undefined | ReturnType<Translation['find']>;

  lookupAst(localeName: string, key: string): undefined | TranslationAST;

  lookup(localeName: string, key: string): undefined | string;
}
