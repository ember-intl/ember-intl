import Helper from '@ember/component/helper';
import { type Registry as Services, service } from '@ember/service';
import type {
  ExperimentName,
  Variant,
} from 'my-v2-app/utils/services/experiments';

interface ExperimentSignature<E extends ExperimentName> {
  Args: {
    Named: {
      name: E;
      variant: Variant<E>;
    };
    Positional: [];
  };
  Return: boolean;
}

type Named<E extends ExperimentName> = ExperimentSignature<E>['Args']['Named'];

type Positional<E extends ExperimentName> =
  ExperimentSignature<E>['Args']['Positional'];

export default class ExperimentHelper<E extends ExperimentName> extends Helper<
  ExperimentSignature<E>
> {
  @service declare experiments: Services['experiments'];

  compute(positional: Positional<E>, named: Named<E>): boolean {
    const { name, variant } = named;

    return this.experiments.getVariant(name) === variant;
  }
}
