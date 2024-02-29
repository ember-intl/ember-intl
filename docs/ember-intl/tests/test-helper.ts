import { setApplication } from '@ember/test-helpers';
import Application from 'docs-app-for-ember-intl/app';
import config from 'docs-app-for-ember-intl/config/environment';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start({
  setupTestIsolationValidation: true,
});
