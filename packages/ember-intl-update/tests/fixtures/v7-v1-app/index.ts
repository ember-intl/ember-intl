import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v7-v1-app/input');
const outputProject = convertFixtureToJson('v7-v1-app/output');

export { inputProject, outputProject };
