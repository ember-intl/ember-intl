import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v8/v2-app/input');
const outputProject = convertFixtureToJson('v8/v2-app/output');

export { inputProject, outputProject };
