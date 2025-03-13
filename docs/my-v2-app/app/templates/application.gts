import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import Route from 'ember-route-template';
import { SelectLocale } from 'my-v2-addon';

export default Route(
  <template>
    {{pageTitle (t "routes.application.title")}}

    <div>
      <main>
        <div>
          <SelectLocale />
        </div>

        <div>
          {{outlet}}
        </div>
      </main>
    </div>
  </template>,
);
