type CodemodOptions = {
  projectRoot: string;
};

type Options = {
  projectRoot: string;
};

type FilePath = string;

type Project = {
  availableKeys: Map<TranslationKey, FilePath[]>;
  usedKeys: Map<TranslationKey, FilePath[]>;
};

type TranslationJson = {
  [key: TranslationKey]: string | TranslationJson;
};

type TranslationKey = string;

export type {
  CodemodOptions,
  Options,
  Project,
  TranslationJson,
  TranslationKey,
};
