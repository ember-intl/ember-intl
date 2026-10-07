import type { LintMethod, LintRule } from '../types/index.js';
import {
  noInconsistentMessages,
  noMissingKeys,
  noUnusedKeys,
} from './lint-rules/index.js';

export const lintRuleMapping: Record<LintRule, LintMethod> = {
  'no-inconsistent-messages': noInconsistentMessages,
  'no-missing-keys': noMissingKeys,
  'no-unused-keys': noUnusedKeys,
};
