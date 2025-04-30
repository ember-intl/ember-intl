import { $ } from 'execa';
import { createUnplugin } from 'unplugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

/**
 * NOTE: JSON is not included here.
 *       we generate json files, and we don't want to infinite loop.
 */
const VALID_EXT = ['.ts', '.js', '.hbs', '.gjs', '.gts', '.html'];

function isFileRelevant(filePath) {
	const isValid = VALID_EXT.some((ext) => filePath.endsWith(ext));

	return isValid;
}

const unplugin = createUnplugin((/* options */) => {
	let timer;
	let currentPromise;

	function runDebounced() {
		clearTimeout(timer);
		setTimeout(() => {
			currentPromise = $`pnpm exec intl-extract --jobs=4`;
			currentPromise.then(() => {
				currentPromise = undefined;
			});
		}, 100);
	}
	return [
		/**
		 * Because i18n can be slow, we don't do the build here.
		 * The i18n build is a separate task in package.json, "i18n:extract",
		 * and is cached by turborepo.
		 */
		{
			name: 'ember-intl:formatjs:18n-watch-mode',
			vite: {
				/**
				 * Only needed if folks don't run i18n:extract
				 *
				 * This isn't explicity needed at this stage,
				 * but it is a separate process from app build,
				 * and we can run it in parallel with everything else.
				 */
				async configResolved() {
					await $`pnpm exec intl-extract --jobs=4`;
				},
				/**
				 * This isn't great as it means that:
				 * - for every change:
				 *   - cause another change (generate the i18n file)
				 *
				 * Over time, we can probably optimize this a bit
				 */
				handleHotUpdate(context) {
					const { file } = context;

					if (!isFileRelevant(file)) {
						return;
					}

					if (currentPromise) {
						currentPromise.then(() => {
							runDebounced();
						});
						return;
					}
					runDebounced();
				},
			},
		},
		viteStaticCopy({
			/**
			 * This may hide errors, but we don't want to overwhelm folks in the terminal.
			 * Ultimately, if this fails, something worse has happened.
			 */
			silent: true,
			targets: [
				{
					src: 'locale/en-US.json',
					dest: 'translations',
					rename: 'en-us.json',
					transform: (content) => {
						const parsed = JSON.parse(content);

						const result = {};

						for (const key in parsed) {
							result[key] = parsed[key].message;
						}

						return JSON.stringify(result, null, 2);
					},
				},
			],
		}),
	];
});

export const i18n = unplugin.vite;
