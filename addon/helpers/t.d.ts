import IntlService from '../services/intl';
import BaseHelper from './-format-base';

type Params = Parameters<IntlService['t']>;

export default class THelper extends BaseHelper<Params[0], Params[1]> {
  allowEmpty: false;

  format(key: Params[0], options?: Params[1]): string;
}
