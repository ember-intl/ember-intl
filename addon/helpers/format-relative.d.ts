import IntlService from '../services/intl';
import BaseHelper from './-format-base';

type Params = Parameters<IntlService['formatRelative']>;

export default class FormatRelativeHelper extends BaseHelper<Params[0], Params[1]> {
  allowEmpty: false;

  format(value: Params[0], options?: Params[1]): string;
}
