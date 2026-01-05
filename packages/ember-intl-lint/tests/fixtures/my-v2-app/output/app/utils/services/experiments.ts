const experimentsForProduction = {
  'nest-product-details': {
    control: 0.5,
    v1: 0.5,
  },
  'subscribe-to-ember-times': {
    control: 0.7,
    v1: 0.3,
  },
} as const;

const experimentsForTesting = {
  'experiment-a': {
    control: 0.5,
    v1: 0.5,
  },
  'experiment-b': {
    control: 0.4,
    v1: 0.3,
    v2: 0.3,
  },
} as const;

export const experiments = {
  ...experimentsForProduction,
  ...experimentsForTesting,
};

export type ExperimentName = keyof typeof experiments;

export type Distribution<E extends ExperimentName> = (typeof experiments)[E];

export type Variant<E extends ExperimentName> = keyof Distribution<E>;

export type AssignedVariants = {
  [E in ExperimentName]: Variant<E> | undefined;
};
