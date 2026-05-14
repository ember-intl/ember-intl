import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v1-app-v7/input');
const outputProject = convertFixtureToJson('v1-app-v7/output');

export { inputProject, outputProject };
