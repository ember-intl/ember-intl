import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-app/input');
const outputProject = convertFixtureToJson('my-v1-app/output');

export { inputProject, outputProject };
