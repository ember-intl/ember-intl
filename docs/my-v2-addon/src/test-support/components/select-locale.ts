import { find, select } from '@ember/test-helpers';

import type { SupportedLocale } from '../../components/select-locale.gts';

export async function selectLocale(locale: SupportedLocale): Promise<void> {
  const option = find(`[data-test-option="${locale}"]`);

  await select(
    '[data-test-select-locale]',
    (option as HTMLSelectElement).value,
  );
}
