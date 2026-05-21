import type { PackageType } from '@codemod-utils/package-json';

type CodemodOptions = {
  projectRoot: string;
};

type Options = {
  packageType: Exclude<PackageType, 'node'>;
  projectRoot: string;
  src: 'addon' | 'app' | 'src';
  targetVersion: TargetVersion;
};

type TargetVersion = 7 | 8;

type Todos = string[];

export type { CodemodOptions, Options, TargetVersion, Todos };
