import type { IntlService } from 'example';
import type { WorkspaceSchema } from 'example';

export default function buildWorkspaceSchema(intl: IntlService): WorkspaceSchema {
	return {
		name: intl.formatMessage({ defaultMessage: 'CrossComply' }),
	};
}
