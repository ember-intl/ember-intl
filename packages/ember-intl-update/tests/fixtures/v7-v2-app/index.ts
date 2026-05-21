import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v7-v2-app/input');
const outputProject = convertFixtureToJson('v7-v2-app/output');

export { inputProject, outputProject };
