import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

const { run:emberRun, merge:emberMerge } = Ember;

export default function startApp(attrs) {
    let application;

    let attributes = emberMerge({}, config.APP);
    attributes = emberMerge(attributes, attrs); // use defaults, but you can override;

    emberRun(() => {
        application = Application.create(attributes);
        application.setupForTesting();
        application.injectTestHelpers();
    });

    return application;
}
