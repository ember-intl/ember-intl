import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app-with-dependencies/input');
const outputProject = convertFixtureToJson('my-v2-app-with-dependencies/output');

export { inputProject, outputProject };
