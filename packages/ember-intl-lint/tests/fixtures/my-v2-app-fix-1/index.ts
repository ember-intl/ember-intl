import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app-fix-1/input');
const outputProject = convertFixtureToJson('my-v2-app-fix-1/output');

export { inputProject, outputProject };
