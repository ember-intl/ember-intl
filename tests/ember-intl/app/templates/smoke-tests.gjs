import { formatDate, formatDateRange, formatNumber, formatRelativeTime, formatTime, t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import RouteTemplate from 'ember-route-template';

export default RouteTemplate(<template>
{{pageTitle (t "routes.smoke-tests.title")}}

<h1>Smoke tests</h1>

<section>
  <h2>
    <code>&#123;&#123;format-number&#125;&#125;</code>
  </h2>

  <div data-test-field="Format Number">
    {{formatNumber
      1000
      currency="EUR"
      format="currency"
      style="currency"
    }}
  </div>
</section>

<section>
  <h2>
    <code>&#123;&#123;format-date&#125;&#125;</code>
  </h2>

  <div data-test-field="Format Date">
    {{formatDate
      "Thu Jan 23 2014 18:00:44 GMT+0000 (GMT)"
      timeZone="UTC"
    }}
  </div>
</section>

<section>
  <h2>
    <code>&#123;&#123;format-date-range&#125;&#125;</code>
  </h2>

  <div data-test-field="Format Date Range">
    {{formatDateRange
      1390500044000
      1390759244000
      timeZone="UTC"
    }}
  </div>
</section>

<section>
  <h2>
    <code>&#123;&#123;format-time&#125;&#125;</code>
  </h2>

  <div data-test-field="Format Time">
    {{formatTime
      "Thu Jan 23 2014 18:00:44 GMT+0000 (GMT)"
      hour="numeric"
      hour12=false
      minute="numeric"
      second="numeric"
      timeZone="UTC"
    }}
  </div>
</section>

<section>
  <h2>
    <code>&#123;&#123;format-relative-time&#125;&#125;</code>
  </h2>

  <div data-test-field="Format Relative Time">
    {{formatRelativeTime 1 unit="day"}}
  </div>
</section>

<section>
  <h2>
    Nested translations, with
    <code>wrapTranslationsWithNamespace = true</code>
  </h2>

  <div data-test-field="Nested Translations">
    {{@controller.nestedTranslation}}
  </div>
</section>
</template>);
