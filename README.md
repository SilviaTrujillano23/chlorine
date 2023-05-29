## Event Manager Backend

This project will handle a REST API to handle events: Create, update, remove and list.

From Firebase, we will use:

* Authentication
* Firestore
* Storage

## Contents

- [Event Manager Backend](#event-manager-backend)
- [Contents](#contents)
- [Dependencies](#dependencies)
- [Getting started](#getting-started)
  - [Local Development](#local-development)
  - [Debugging](#debugging)
  - [Proposals Type Commits](#proposals-type-commit)
- [Folder structure](#folder-structure)
- [Examples of available endpoints](#examples-of-available-endpoints)
## Dependencies

For this application, we are using Nodejs v18. (You will check .nvmrc file)

For MacOS:

```bash
brew install nvm
nvm install v18
```

## Getting started

### Local Development

For local develpment, you should copy .env.example and use environment variables according to the env.

| Key                   | Description                                                                     |
|:----------------------|:--------------------------------------------------------------------------------|
| **PRIVATE_KEY_ID:**     | Project Id according Firebase (**mandatory**). |
| **PRIVATE_KEY:** | Unique identifer for Project in Firebase |
| **CLIENT_EMAIL:**     | Email created by Firebase for GService account |
| **CLIENT_ID:**          | Identifier for client connection |
| **CLIENT_CERT_URL:**          | Cert URL for Google identification |

Finally, use the following command to run the application

```bash
yarn start
```

If you need to reload the application on each change, use the following command

```bash
yarn dev
```

### Debugging

On MacOS, if you use nvm within a specific version, please add the following:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/index.js",
      "runtimeExecutable": "${env:HOME}/.nvm/versions/node/{Specific version}/bin/node"
    }
  ]
}
```

### Proposals Type Commits

- `feat`: Introduces a new feature to the codebase (this correlates with MINOR in [SemVer](https://semver.org/)).

  `feat: add new implementation to Xyz`

- `fix`: Patches a bug in the codebase (this correlates with PATCH in [SemVer](https://semver.org/)).

  `fix: change constant value CONSTANT_XYZ in Xyz class`

- `build`: Changes that affect the build system or dependencies (npm, gradle, etc)

  `build: change database driver version`

- `ci`: Continuous Integration configuration changes in files/scripts (GitLab CI, GitHub Actions)

  `ci: change config in .circleci adding a code-lint job `

- `docs`: Documentation files changes (Readme.md)

  `docs: change Readme.md adding info to local deploy`

- `perf`: Improves the performance

  `perf: delete boilerplate implementation in Xyz`

- `refactor`: Code that neither fixes a bug/feature

  `refactor: delete boilerplate implementation in Xyz`

- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

  `style: change the tabulation format in Xyz`

- `test`: Adding missing tests or correcting existing ones

  `test: add missing test to Xyz implementation`

- `chore`: Other changes that don't modify src or test files

  `chore: ignore X file in .gitignore `

- `revert`: Reverts a previous commit

  `revert: reverts a1s2d3f4g5 commit `

- `wip`: Changes to commit that haven't yet finished

  `wip: Xyz class refactor `

## Folder structure

services: This folder will group all services
models: This folder will group all models
controllers: This folder will group all endpoints available for the application
providers: this folder group all data providers for the application. In this case: firebase
services-config: this folder have the api keys for firebase
tests: this folder group all unit tests

## Examples of  available endpoints

```
- get http://localhost:5001/api/healthcheck/
- get http://localhost:5001/api/users
- get http://localhost:5001/api/users/:id
- post http://localhost:5001/api/users/
- put http://localhost:5001/api/users/:id
- delete http://localhost:5001/api/users/:id
```

Note: After using login endpoint, add Authorization key for each request with login token's content.
