import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-addon/input');
const outputProject = convertFixtureToJson('my-v2-addon/output');

export { inputProject, outputProject };
