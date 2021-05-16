// BEGIN-SNIPPET docs-helpers-format-date-app.js

// app/formats.js

export default {
  date: {
    'my-custom-format': {
      day: '2-digit',
      month: '2-digit',
      // Add additional options here.
      // They are the same as passing them
      // as named arguments to the `format-date` helper.
    },
  },
};
// END-SNIPPET
