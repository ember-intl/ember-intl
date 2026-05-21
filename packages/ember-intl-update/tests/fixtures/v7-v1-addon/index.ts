import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v7-v1-addon/input');
const outputProject = convertFixtureToJson('v7-v1-addon/output');

export { inputProject, outputProject };
