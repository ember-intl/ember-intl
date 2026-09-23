import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app-fix-2/input');
const outputProject = convertFixtureToJson('my-v2-app-fix-2/output');

export { inputProject, outputProject };
