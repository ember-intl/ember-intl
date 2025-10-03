import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import RouteTemplate from 'ember-route-template';

export default RouteTemplate(
  <template>
    {{pageTitle (t "routes.application.title")}}

    <div>
      <main>
        <div>
          {{outlet}}
        </div>
      </main>
    </div>
  </template>,
);
