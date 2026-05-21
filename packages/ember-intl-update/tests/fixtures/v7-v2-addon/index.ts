import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v7-v2-addon/input');
const outputProject = convertFixtureToJson('v7-v2-addon/output');

export { inputProject, outputProject };
