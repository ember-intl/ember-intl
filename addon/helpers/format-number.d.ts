import IntlService from '../services/intl';
import BaseHelper, { BaseHelperSignature } from './-format-base';

type Params = Parameters<IntlService['formatNumber']>;

export default class FormatNumberHelper extends BaseHelper<
  BaseHelperSignature<Params[0], Params[1]>
> {
  allowEmpty: false;

  format(value: Params[0], options?: Params[1]): string;
}
