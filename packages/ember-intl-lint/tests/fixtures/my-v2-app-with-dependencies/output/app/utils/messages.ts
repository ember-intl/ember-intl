import { t as translate } from 'ember-intl';
import { t, tKey } from 'my-app/utils/intl';

export const description = t('routes.index.description');

export const fromEmberIntl = translate('routes.index.key-from-ember-intl');

export const label = tKey('routes.index.label');
