import '@glint/environment-ember-loose';

import type { HelperLike } from '@glint/template';
import type PageTitle from 'ember-page-title/template-registry';

declare module '@glint/environment-ember-loose/registry' {
	export default interface Registry extends PageTitle {
		/* no customizations for now */
		'format-message': HelperLike<{ Args: { Positional: [string] }; Return: string }>;
	}
}
