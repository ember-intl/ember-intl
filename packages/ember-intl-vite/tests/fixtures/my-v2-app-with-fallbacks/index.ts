import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app-with-fallbacks/input');
const outputProject = convertFixtureToJson('my-v2-app-with-fallbacks/output');

export { inputProject, outputProject };
