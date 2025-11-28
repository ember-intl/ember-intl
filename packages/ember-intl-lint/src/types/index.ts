type CodemodOptions = {
  projectRoot: string;
};

type Options = {
  projectRoot: string;
};

type FilePath = string;

type Project = {
  usedKeys: Map<TranslationKey, FilePath[]>;
};

type TranslationKey = string;

export type { CodemodOptions, Options, Project };
