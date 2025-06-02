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

<summary>Run the demo app</summary>

1. Once dependencies have been installed, you can run the [demo app](./docs/ember-intl).

    ```sh
    # From the workspace root
    pnpm start
    ```

1. Open the app at [http://localhost:4200](http://localhost:4200).

</details>


<details>

<summary>Check and fix errors</summary>

1. As you write code, please check that it meets formatting and linting rules.

    ```sh
    # From the workspace root
    pnpm lint
    ```

1. You can run `lint:fix` to fix errors.

    ```sh
    # From the workspace root
    pnpm lint:fix
    ```

</details>


<details>

<summary>Run tests</summary>

1. When you write code, please check that all tests continue to pass.

    ```sh
    # From the workspace root
    pnpm test
    ```

</details>


<details>

<summary>Add changeset to pull request</code></summary>

1. To record how a pull request affects packages, you will want to add a changeset.

    The changeset provides a summary of the code change. It also describes how package versions should be updated (major, minor, or patch) as a result of the code change.

    ```sh
    # From the workspace root
    pnpm changeset
    ```

</details>


<details>

<summary>Publish packages (for admins)</summary>

1. Generate a [personal access token](https://github.com/settings/tokens/) in GitHub. This token will be used to retrieve pull request information.

1. Run the `release:prepare` script. This removes changesets, updates package versions, and updates `CHANGELOG`s.

    ```sh
    # From the workspace root
    GITHUB_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> pnpm release:prepare
    ```

    Note, `release:prepare` also updated the workspace root's version (e.g. from `0.1.1` to `0.1.2`). We will use it to name the tag that will be published.

1. Review the file changes. Commit them in a branch, then open a pull request to merge the changes to the `main` branch.

    ```sh
    # From the workspace root
    git checkout -b tag-0.1.2
    git add .
    git commit -m "Tagged 0.1.2"
    git push origin tag-0.1.2
    ```

1. [Create a tag](https://github.com/ember-intl/ember-intl/releases/new) and provide release notes. The tag name should match the workspace root's version, prefixed by the letter `v` (e.g. `v0.1.2`).

1. Publish the packages.

    ```sh
    # From the workspace root
    pnpm release:publish
    ```

</details>
