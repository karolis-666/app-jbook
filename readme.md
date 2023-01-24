# Jbook Online Code Editor

⭐ Online code editor created for educational purposes following udemy course ⭐

### Installation

1. App-Jbook requires [Lerna](https://lerna.js.org/) to be installed globally of exact **@3.22.1** version:

   `npm install -g --save-exact@3.22.1`

2. Install **node_modules** for each package:

   `lerna bootstrap`

### Starting

To start application front-end:

`npm run start`

Alternativelly, go to path via terminal `packages/cli/dist` and launch command:

`node index.js serve`

### Development

1. Start application
2. Develop
3. ???
4. Super result

### Publishing

To publish package to NPM:

`lerna publish`

> Note: only repo owner can publish to NPM. If oyu wan't to publish separate package, you need to rename all package.json names and imports related to that name
