import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v2-app-v7/input');
const outputProject = convertFixtureToJson('v2-app-v7/output');

export { inputProject, outputProject };
