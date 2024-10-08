import templateOnlyComponent from '@ember/component/template-only';

interface TranslationWithArgumentsSignature {
  Args: {};
}

const TranslationWithArgumentsComponent =
  templateOnlyComponent<TranslationWithArgumentsSignature>();

export default TranslationWithArgumentsComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    TranslationWithArguments: typeof TranslationWithArgumentsComponent;
  }
}
