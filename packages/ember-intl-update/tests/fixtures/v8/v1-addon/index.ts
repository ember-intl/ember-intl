import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v8/v1-addon/input');
const outputProject = convertFixtureToJson('v8/v1-addon/output');

export { inputProject, outputProject };
