import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app-fix/input');
const outputProject = convertFixtureToJson('my-v2-app-fix/output');

export { inputProject, outputProject };
