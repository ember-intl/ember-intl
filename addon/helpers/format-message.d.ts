import type IntlService from '../services/intl';
import BaseHelper, { type BaseHelperSignature } from './-format-base';

type Params = Parameters<IntlService['formatMessage']>;

export default class FormatMessageHelper extends BaseHelper<
  BaseHelperSignature<Params[0], Params[1]>
> {
  allowEmpty: false;

  format(value: Params[0], options?: Params[1]): string;
}
