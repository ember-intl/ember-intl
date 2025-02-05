import eslintConfigEmberApp from '@shared-configs/eslint-config-ember/app/index.js';
import eslintConfigYaml from '@shared-configs/eslint-config-yaml/index.js';

export default [...eslintConfigEmberApp, ...eslintConfigYaml];
