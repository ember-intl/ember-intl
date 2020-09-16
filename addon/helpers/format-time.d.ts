import BaseHelper from './-format-base';
import IntlService from '../services/intl';

type Params = Parameters<IntlService['formatTime']>;

export default class FormatTimeHelper extends BaseHelper<Params[0], Params[1]> {
  allowEmpty: false;

  format(value: Params[0], options?: Params[1]): string;
}
