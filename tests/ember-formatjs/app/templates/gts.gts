import formatMessage from 'ember-intl/helpers/format-message';
import route from 'ember-route-template';

export default route(
	<template>
		<h2 id="title">{{formatMessage "Welcome to Ember"}}</h2>

		{{outlet}}
	</template>,
);
