import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-app-with-lazy-loaded-translations/input');
const outputProject = convertFixtureToJson('my-v2-app-with-lazy-loaded-translations/output');

export { inputProject, outputProject };
