import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-addon/input');
const outputProject = convertFixtureToJson('my-v1-addon/output');

export { inputProject, outputProject };
