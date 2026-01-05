import { assert } from '@ember/debug';
import Service from '@ember/service';
import {
  type AssignedVariants,
  type ExperimentName,
  experiments,
  type Variant,
} from 'my-v2-app/utils/services/experiments';
import { TrackedObject } from 'tracked-built-ins';

export default class ExperimentsService extends Service {
  private assignedVariants = new TrackedObject<AssignedVariants>(
    {} as AssignedVariants,
  );
  private experiments = experiments;

  decideVariant<E extends ExperimentName>(experimentName: E): void {
    if (experimentName in this.assignedVariants) {
      return;
    }

    const distribution = this.experiments[experimentName];
    const variants = Object.keys(distribution) as AssignedVariants[E][];

    let total = 0;
    const sample = Math.random();

    for (const variant of variants) {
      total += distribution[variant as Variant<E>] as number;

      if (sample < total) {
        this.assignedVariants[experimentName] = variant;
        break;
      }
    }
  }

  getVariant<E extends ExperimentName>(experimentName: E): Variant<E> {
    assert(
      `${experimentName} is an unknown experiment.`,
      experimentName in this.experiments,
    );

    assert(
      `The variant for ${experimentName} has not been assigned. Call decideVariant() first.`,
      experimentName in this.assignedVariants,
    );

    return this.assignedVariants[experimentName]!;
  }
}

declare module '@ember/service' {
  interface Registry {
    experiments: ExperimentsService;
  }
}
