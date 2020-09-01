import Helper from '@ember/component/helper';
import IntlService from '../../services/intl';

export default abstract class AbstractHelper<V, O extends {} | undefined> extends Helper {
  readonly intl: IntlService;
  allowEmpty: boolean;

  abstract format(value: V, options?: O): string;

  compute(positional: [undefined], options: O & { allowEmpty: false }): never;
  compute(positional: [undefined], options: O & { allowEmpty: true }): void;
  compute(positional: [V], options: O & { allowEmpty?: boolean }): string | never;
}
