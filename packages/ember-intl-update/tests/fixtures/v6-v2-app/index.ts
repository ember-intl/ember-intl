import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('v6-v2-app/input');
const outputProject = convertFixtureToJson('v6-v2-app/output');

export { inputProject, outputProject };
