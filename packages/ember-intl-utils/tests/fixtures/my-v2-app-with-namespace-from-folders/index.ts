import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app-with-namespace-from-folders/input');
const outputProject = convertFixtureToJson('my-v2-app-with-namespace-from-folders/output');

export { inputProject, outputProject };
