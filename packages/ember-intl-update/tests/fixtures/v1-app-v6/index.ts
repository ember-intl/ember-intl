import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v1-app-v6/input');
const outputProject = convertFixtureToJson('v1-app-v6/output');

export { inputProject, outputProject };
