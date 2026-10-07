export const lintRules = [
  'no-inconsistent-messages',
  'no-missing-keys',
  'no-unused-keys',
] as const;

export type LintRule = (typeof lintRules)[number];
