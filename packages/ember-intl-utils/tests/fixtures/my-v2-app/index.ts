import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app/input');
const outputProject = convertFixtureToJson('my-v2-app/output');

export { inputProject, outputProject };
