import type ApplicationInstance from '@ember/application/instance';
import { getContext, settled } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';

export async function updateLocale(locale: 'de-de' | 'en-us'): Promise<void> {
  const { owner } = getContext() as { owner: ApplicationInstance };

  const intl = owner.lookup('service:intl') as IntlService;

  intl.setLocale([locale]);

  await settled();
}
