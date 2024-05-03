import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Application from 'my-app-with-namespace-from-folders/app';
import config from 'my-app-with-namespace-from-folders/config/environment';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start({
  setupTestIsolationValidation: true,
});
