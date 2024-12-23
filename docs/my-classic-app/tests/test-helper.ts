import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Application from 'my-classic-app/app';
import config from 'my-classic-app/config/environment';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
