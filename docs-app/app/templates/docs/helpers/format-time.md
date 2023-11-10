<LocaleSwitcher />

# Format Time

This helper behaves like the `{{format-date}}` helper, except its format comes from `formats.time`.

<DocsDemo as |demo|>
  <demo.example @name="docs__helpers__format-time__example-1">
    <div>
      Time: {{format-time this.today format="hhmmss"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="my-component.hbs"
    @name="docs__helpers__format-time__example-1__my-component.hbs"
  />

  <demo.snippet
    @label="my-component.js"
    @name="docs__helpers__format-time__example-1__my-component.js"
  />
</DocsDemo>


## Custom format

Visit <DocsLink @route="docs.helpers.format-date">Format Date</DocsLink> to learn more. (See the section "Custom format.")