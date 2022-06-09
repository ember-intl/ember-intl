import Application from 'dummy/app';
import config from 'dummy/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { setup } from 'qunit-dom';
import 'qunit-dom';
import * as QUnit from 'qunit';
import td from 'testdouble';
import installVerifyAssertion from 'testdouble-qunit';

// https://github.com/alexlafroscia/testdouble-qunit/tree/master/packages/testdouble-qunit
installVerifyAssertion(QUnit, td);

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
