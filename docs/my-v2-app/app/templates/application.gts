import { pageTitle } from 'ember-page-title';
import Route from 'ember-route-template';

export default Route(
  <template>
    {{pageTitle "ember-intl"}}

    <div>
      {{outlet}}
    </div>
  </template>,
);
