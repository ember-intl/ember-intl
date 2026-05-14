type CodemodOptions = {
  projectRoot: string;
};

type Options = {
  projectRoot: string;
  src: Src;
  targetVersion: TargetVersion;
};

type Src = 'addon' | 'app' | 'src';

type TargetVersion = 7 | 8;

export type { CodemodOptions, Options, Src, TargetVersion };
