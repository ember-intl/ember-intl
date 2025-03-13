import { setApplication } from '@ember/test-helpers';
import { setupEmberOnerrorValidation, start } from 'ember-qunit';
import { loadTests } from 'ember-qunit/test-loader';
import Application from 'my-v1-app-with-namespace-from-folders/app';
import config from 'my-v1-app-with-namespace-from-folders/config/environment';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);
setupEmberOnerrorValidation();
loadTests();
start();
