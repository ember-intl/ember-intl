import type { Config } from '../config.js';

export type Options = {
  [key: string]: unknown;
  config: Config;
  projectRoot: string;
};
