import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('sample-project/input');
const outputProject = convertFixtureToJson('sample-project/output');

export { inputProject, outputProject };
