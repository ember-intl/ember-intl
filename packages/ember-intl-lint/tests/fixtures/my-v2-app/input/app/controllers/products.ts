import Controller from '@ember/controller';
import { type Registry as Services, service } from '@ember/service';
import { isTesting, macroCondition } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

const TIMEOUT_IN_MILLISECONDS = macroCondition(isTesting()) ? 1 : 300;

type Option = {
  label: string;
  value: string;
};

export default class ProductsController extends Controller {
  queryParams = ['name', 'sortBy'];

  @service declare intl: Services['intl'];

  @tracked name: string | null = null;
  @tracked sortBy: string | null = null;

  updateQueryParameters = restartableTask(
    async ({ key, value }: { key: string; value?: string }) => {
      if (key !== 'name' && key !== 'sortBy') {
        return;
      }

      await timeout(TIMEOUT_IN_MILLISECONDS);

      if (value === undefined || value === '') {
        this[key] = null;
        return;
      }

      this[key] = value;
    },
  );

  get options(): Option[] {
    return [
      {
        label: this.intl.t('routes.products.sort-by.name-ascending'),
        value: 'name:asc',
      },
      {
        label: this.intl.t('routes.products.sort-by.name-descending'),
        value: 'name:desc',
      },
      {
        label: this.intl.t('routes.products.sort-by.price-ascending'),
        value: 'price:asc',
      },
      {
        label: this.intl.t('routes.products.sort-by.price-descending'),
        value: 'price:desc',
      },
    ];
  }
}
