# Contributing to ember-intl

## Local development

<details>

<summary>Install dependencies</summary>

1. Fork and clone this repo.

    ```sh
    git clone git@github.com:<your GitHub handle>/ember-intl.git
    ```

1. Change directory.

    ```sh
    cd ember-intl
    ```

1. Use `yarn` to install dependencies.

    ```sh
    yarn install
    ```

</details>


<details>

<summary>Run the docs-app</summary>

1. Once dependencies have been installed, you can run the docs-app.

    ```sh
    yarn start
    ```

1. Open the app at [http://localhost:4200](http://localhost:4200).

</details>


<details>

<summary>Lint files</summary>

1. When you write code, please check that it meets the linting rules.

    ```sh
    yarn lint
    ```

1. You can run `lint:fix` to automatically fix linting errors.

    ```sh
    yarn lint:fix
    ```

</details>


<details>

<summary>Run tests</summary>

1. When you write code, please check that all tests continue to pass.

    ```sh
    # Ember tests
    yarn test

    # Node tests
    yarn test:node
    ```

</details>


<details>

<summary>Publish packages (for admins)</summary>

1. Generate a [personal access token](https://github.com/settings/tokens/) in GitHub, with default values for scopes (none selected).

1. Create a pull request, in which you update the package version and `CHANGELOG`.

    ```sh
    GITHUB_AUTH=<YOUR_PERSONAL_ACCESS_TOKEN> yarn changelog
    ```

1. [Create a tag](https://github.com/ember-intl/ember-intl/releases/new) such as `v1.0.0` (the name satisfies the regular expression `^v\d+\.\d+\.\d+`).

1. Publish the package.

    ```sh
    npm publish
    ```

</details>
