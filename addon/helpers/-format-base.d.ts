import Helper from '@ember/component/helper';

import IntlService from '../services/intl';

export interface BaseHelperSignature<Value, Options extends Record<string, unknown>> {
  Args: {
    Named?: Options & { allowEmpty?: boolean };
    Positional: [Value?, Options?];
  };
  Return: string;
}

export default abstract class AbstractHelper<Signature extends BaseHelperSignature> extends Helper<Signature> {
  readonly intl: IntlService;
  allowEmpty: boolean;

  abstract format(value: Signature['Args']['Positional'][0], namedOptions?: Signature['Args']['Named']): string;

  compute(positional: [undefined], namedOptions: Signature['Args']['Named'] & { allowEmpty: false }): never;
  compute(positional: [undefined], namedOptions: Signature['Args']['Named'] & { allowEmpty: true }): void;
  compute(positional: Signature['Args']['Positional'], namedOptions: Signature['Args']['Named']): string | never;
}
