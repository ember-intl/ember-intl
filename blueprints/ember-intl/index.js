module.exports = {
	description: 'Generates a boilerplate message and format',

	normalizeEntityName: function () {},

	afterInstall: function (options) {
		return this.addPackageToProject('intl-format-cache', '^2.0.4');
	}
}
