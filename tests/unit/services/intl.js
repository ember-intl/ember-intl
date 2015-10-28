import { moduleFor } from 'ember-qunit';
import test from 'dummy/tests/ember-sinon-qunit/test';

let service;

moduleFor('service:intl', 'Unit | Service | intl', {
  setup() {
    service = this.subject();
  }
});

let message, translation, key, result, formatStub, findStub, formatArgs, findArgs;

function setupT(options, formats) {
  message = 'foobar';
  translation = 'foo';
  key = 'foo.bar';
  formatStub = this.stub(service, 'formatMessage', function () {
    return message;
  });
  findStub = this.stub(service, 'findTranslationByKey', function () {
    return translation;
  });

  result = service.t(key, options, formats);

  formatArgs = formatStub.firstCall.args;
  findArgs = findStub.firstCall.args;
}

test('t', function (assert) {
  setupT.call(this);

  assert.ok(findStub.calledOnce, 'findTranslationByKey was called once');
  assert.ok(formatStub.calledOnce, 'formatMessage was called once');
  assert.equal(formatArgs[0], translation, 'result of findTranslationByKey was passed to formatMessage');
  assert.equal(result, message, 'result of formatMessage is returned');
});

test('t with key only', function (assert) {
  setupT.call(this);

  assert.equal(findArgs.length, 1, '1 param passed to findTranslationByKey');
  assert.equal(findArgs[0], key, 'key passed to findTranslationByKey');
  assert.equal(formatArgs.length, 1, '1 param passed to formatMessage');
});

test('t with options, no locale', function (assert) {
  const options = { foo: 'bar' };
  setupT.call(this, options);

  assert.equal(findArgs.length, 1, '1 param passed to findTranslationByKey');
  assert.equal(formatArgs.length, 2, '2 params passed to formatMessage');
  assert.equal(formatArgs[1], options, 'options passed to formatMessage');
});

test('t with options & locale', function (assert) {
  const locale = 'en';
  const options = { locale };
  setupT.call(this, options);

  assert.equal(findArgs.length, 2, '2 params passed to findTranslationByKey');
  assert.equal(findArgs[1], locale, 'locale passed to findTranslationByKey');
});

test('t with formats', function (assert) {
  const formats = ['foo'];
  setupT.call(this, undefined, formats);

  assert.equal(formatArgs.length, 3, '3 params passed to findTranslationByKey');
  assert.equal(formatArgs[1], undefined, 'no options passed to formatMessage');
  assert.equal(formatArgs[2], formats, 'formats passed to formatMessage');
});


