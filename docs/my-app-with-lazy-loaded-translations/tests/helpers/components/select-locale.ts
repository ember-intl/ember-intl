import { find, select } from '@ember/test-helpers';
import type { SupportedLocale } from 'my-app/components/select-locale';

export async function selectLocale(locale: SupportedLocale): Promise<void> {
  const option = find(`[data-test-option="${locale}"]`);

  await select(
    '[data-test-select-locale]',
    (option as HTMLSelectElement).value,
  );
}
