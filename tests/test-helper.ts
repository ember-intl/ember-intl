import { setApplication } from '@ember/test-helpers';
import Application from 'dummy/app';
import config from 'dummy/config/environment';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import td from 'testdouble';
import installVerifyAssertion from 'testdouble-qunit';

// https://github.com/alexlafroscia/testdouble-qunit/tree/master/packages/testdouble-qunit
installVerifyAssertion(QUnit, td);

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
