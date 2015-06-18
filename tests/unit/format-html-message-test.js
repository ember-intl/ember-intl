import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { runAppend, runDestroy } from '../helpers/run-append';
import formatHtmlHelper from 'ember-intl/helpers/format-html-message';

var view;

moduleFor('ember-intl@formatter:format-html-message', {
    needs: ['service:intl'],
    beforeEach: function () {
        this.service = this.container.lookup('service:intl');
        this.container.injection('formatter', 'intl', 'service:intl');
        this.container.register('helper:format-html-message', formatHtmlHelper);

        var container = this.container;
        var service = this.service;

        this.intlBlock = function intlBlock(template, serviceContext) {
            if (typeof serviceContext === 'object') {
                Ember.run(function () {
                    service.setProperties(serviceContext);
                });
            }

            return Ember.View.create({
              template: Ember.HTMLBars.compile(template),
              container: container,
              context: {}
            });
        };
    },
    afterEach: function () {
        runDestroy(view);
    }
});


test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatHtmlHelper);
});

test('message is formatted correctly with argument', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-html-message "Hello {name}" name="Jason"}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-html-message}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-html-message', { locale: 'en' });
});

test('should allow for inlined html in the value', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-html-message "<strong>Hello {name}</strong>" name="Jason"}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().html(), "<strong>Hello Jason</strong>");
});

test('should escape arguments', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-html-message "{foo}" foo="<em>BAR</em>"}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().html(), "&lt;em&gt;BAR&lt;/em&gt;");
});

test('should allow for inlined html in the value but escape arguments', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-html-message "<strong>Hello {name}</strong>" name="<em>Jason</em>"}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().html(), "<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>");
});
