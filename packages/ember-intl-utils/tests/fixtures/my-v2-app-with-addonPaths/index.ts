import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app-with-addonPaths/input');
const outputProject = convertFixtureToJson('my-v2-app-with-addonPaths/output');

export { inputProject, outputProject };
