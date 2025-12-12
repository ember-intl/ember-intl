import type { LintMethod } from '../types/index.js';
import {
  noInconsistentMessages,
  noMissingKeys,
  noUnusedKeys,
} from './lint-rules/index.js';

export const lintRules = [
  'no-inconsistent-messages',
  'no-missing-keys',
  'no-unused-keys',
] as const;

export type LintRule = (typeof lintRules)[number];

export const lintRuleMapping: Record<LintRule, LintMethod> = {
  'no-inconsistent-messages': noInconsistentMessages,
  'no-missing-keys': noMissingKeys,
  'no-unused-keys': noUnusedKeys,
};
