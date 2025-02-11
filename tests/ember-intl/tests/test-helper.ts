import { setApplication } from '@ember/test-helpers';
import { setupEmberOnerrorValidation, start } from 'ember-qunit';
import { loadTests } from 'ember-qunit/test-loader';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import Application from 'test-app-for-ember-intl/app';
import config from 'test-app-for-ember-intl/config/environment';

setApplication(Application.create(config.APP));

setup(QUnit.assert);
setupEmberOnerrorValidation();
loadTests();
start();
