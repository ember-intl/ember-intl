# Contributing to ember-intl

## Local development

<details>

<summary>Install dependencies</summary>

1. Fork and clone this repo.

    ```sh
    git clone git@github.com:<your-github-handle>/ember-intl.git
    ```

1. Change directory.

    ```sh
    cd ember-intl
    ```

1. Use [`pnpm`](https://pnpm.io/installation) to install dependencies.

    ```sh
    pnpm install
    ```

</details>


<details>

<summary>Run the docs-app</summary>

1. Once dependencies have been installed, you can run the docs-app.

    ```sh
    pnpm start
    ```

1. Open the app at [http://localhost:4200](http://localhost:4200).

</details>


<details>

<summary>Lint files</summary>

1. When you write code, please check that it meets the linting rules.

    ```sh
    pnpm lint
    ```

1. You can run `lint:fix` to automatically fix linting errors.

    ```sh
    pnpm lint:fix
    ```

</details>


<details>

<summary>Run tests</summary>

1. When you write code, please check that all tests continue to pass.

    ```sh
    # Ember tests
    pnpm test

    # Node tests
    pnpm test:node
    ```

</details>


<details>

<summary>Publish packages (for admins)</summary>

1. Generate a [personal access token](https://github.com/settings/tokens/) in GitHub, with default values for scopes (none selected).

1. Run the `release:changelog` script. This generates a text that you can add to `CHANGELOG.md`.

    ```sh
    GITHUB_AUTH=<YOUR_PERSONAL_ACCESS_TOKEN> pnpm release:changelog
    ```

    Update the version number in `package.json`. Then, create a commit for the file changes (i.e. `CHANGELOG.md` and `package.json`).

1. [Create a tag](https://github.com/ember-intl/ember-intl/releases/new) and provide release notes. The tag name should match the package version, prefixed by the letter `v`. For example, `v1.0.0`.

1. Publish the package.

    ```sh
    pnpm release:publish
    ```

</details>
