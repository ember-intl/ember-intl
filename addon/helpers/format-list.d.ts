import IntlService from '../services/intl';
import BaseHelper, { BaseHelperSignature } from './-format-base';

type Params = Parameters<IntlService['formatList']>;

export default class FormatListHelper extends BaseHelper<BaseHelperSignature<Params[0], Params[1]>> {
  allowEmpty: false;

  format(value: Params[0], options?: Params[1]): string;
}
