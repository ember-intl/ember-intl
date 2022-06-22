import IntlService from '../services/intl';
import BaseHelper from './-format-base';

type Params = Parameters<IntlService['formatDate']>;

export default class FormatDateHelper extends BaseHelper<Params[0], Params[1]> {
  allowEmpty: true;

  format(value: Params[0], options?: Params[1]): string;
}
