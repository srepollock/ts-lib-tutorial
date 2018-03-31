# Typescript Library Building Tutorial

> Created by Spencer Pollock

My student presentation for COMP8851. This is a Typescript base project to demonstrate creating a Typescript library to be used and consumed in a Javascript format. This presentations goes over a quick synopsys of [Typescripts](https://www.typescriptlang.org/) benefits, how to start a project, how to utalize the [Rollup](https://rollupjs.org/guide/en) bundler with the [Babel](https://babeljs.io/) compiler (for es2015+ Typescript support), [Mocha](https://mochajs.org/) unit testing framework, [Chai](http://www.chaijs.com/) assertion library and then publish the project to [npm](https://www.npmjs.com/).

# Tutorial

> The step by step to make your own project.

## Install NodeJS and NPM

Head to the [NodeJS download site](https://nodejs.org/en/download/) and get the LTS or Current version (whichever you choose to target, I chose current for this project).
> Note: You can always roll back versions with npm later

After installing, make sure you have the path variables working. Open a terminal and run:

`node -v`

You should get the version number ^8.11.1 (or higher as denoted by the '^') at the time of writing this.

Npm is automatically installed by NodeJS, so let's test that it's working. Run:

`npm -v`

to test npm.

Now, to install the latest version of npm run:

`npm i[nstall] npm@latest -g`.

Now that npm is installed and updated, setup your new projects folder. Let's call it **TypescriptLibraryTutorial**, this will also be the name of our npm package.

`mkdir TypescriptLibraryTutorial && cd TypescriptLIbraryTutorial`

Then we need to initialize our npm project:

`npm init`

Now we have a `package.json` file in our project. We need to make a few modifications; make sure that your `package.json` file looks like this:

```json
{
  "name": "ts-lib-tutorial",
  "version": "1.0.0",
  "description": "A tutorial for building and deploying a Typescript buildable suite",
  "main": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "bundle": "rollup -c",
    "test": "mocha"
  },
  "keywords": [ // Set other project keywords here
    "typescript",
    "rollup",
    "babel",
    "mocha",
    "chai",
    "tutorial"
  ],
  "author": "", // Set yourself as the author here
  "repository": "github:srepollock/ts-lib-tutorial", // Modify your url here
  "license": "IIRC",
  "devDependencies": {
      // Do not worry about here
  },
  "dependencies": {
      // Do not worry about here
  },
  "babel": {
    "presets": [
        ["env", {
            "modules": false
        }]
    ]
  }
}

```

> Note: At the end of the file with the "babel" identifier, this is equivilent to a babel.config.json file. More on this in [Rollup](#setting-up-rollup-and-babel)

> Also Note: There is a definition for "scripts" in the file. This is to be used with `npm run-script [script name]` on the command line to execute. This will be used later.

## Setup your Projects Typescript Dependency

After npm is setup, we need to install Typescript to the project as a dependency.

> Note: We have to install dependencies before we can setup as a Typescript project as Typescript is a dependency to this project.

`npm i[nstall] --save-dev typescript`

> Note: `--save-dev` is an npm compiler flag to save this dependency to the project only. We could install this package globally with `npm i[nstall] typescript -g` but this can lead to issues with multiple projects that use different versions of the dependencies, thus it is save to install them with `--save-dev` for the project only.

After installing Typescript we can initialize it with:

`./node_modules/.bin/tsc init`

This will initialize the project and setup a base `tsconfig.json` at the current working directory on the command line. After the file has been created make sure that it looks like this:

```json
{
    "compilerOptions":
    {
        "target": "es6",
        "module": "es2015",
        "lib": ["es6"],
        "outDir": "./dist",
        "strict": true,
        "noImplicitAny": true,
        "esModuleInterop": true,
        "experimentalDecorators": true,
    },
  "include": [
    "src/**/*"
  ]
}
```

Let's quickly setup some project directories and files.

## Building and Running

Let's make a source directory for all our library code to go into and make our `index.ts` file:

`mkdir src && touch src/index.ts`

Let's also make a `Math.ts` to put some code for demo purposes:

`touch src/Math.ts`

With that done, we can now insert some code into to get this project running. 

`src/Math.ts`

```ts
export function add(x: number, y: number) : number {
    return x + y;
}
export function subtract(x: number, y: number) : number {
    return x - y;
}
```

and `src/index.ts` will need to export the functions for usage outside the library:

```ts
export * from './Math';
```

Now we can build our project with the the script we setup earlier in the `package.json` file.

`npm run-script build`

The files will appear in a `./dist` directory as `*.js` files. Now we COULD use the `*.js*` files, however they are not in the right format, and we would have to write extra processing code in another Javascript file, plus this is just a duplication of our current working files displayed in Javascript. What would make this library better to use is a bundler.

## Setting up Rollup and Babel

Multiple dependenices in our code base is something we want to avoid. While we have multiple dependencies for our build environment, we need our exported library to be easily consumable for our developers. To accomplish this, [Rollup](https://rollupjs.org) will be used alongside [Babel](https://babeljs.io) as a plugin.

First we need to install them as dependencies to the project:

`npm i --save-dev rollup babel-cli rollup-plugin-typescript2 rollup-plugin-babel babel-preset-env babel-preset-es2015-rollup`

While this looks like a long command, and will install many dependencies, it is necessary to getting our latest Typescript standards code back to Javascript readable code for browsers to use.

Next we need to create the `rollup.config.js` in the root of our project. This file is invoked when we call `rollup -c` (*think:* rollup -config) from the command line.

> Note: We already set this up as a npm task in the `package.json` file, so just call `npm run-script bundle` to run.

`rollup.config.js`
```js
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

export default {
    input: './src/index.ts', // main file to pull our library from
    output: [ // output format
        {
            file: './build/bundle.js', // our output file
            format: 'cjs', // output format; cjs = commonjs (what nodejs is written in)
        }
    ],
    plugins: [
        typescript(),
        babel() // This will use the config found in package.json that we defined
    ]
}
```

Now our project is ready to bundle! To bundle the project for Javascript usage call:

`npm run-task bundle`

And now we have a `build/bundle.js` file ready to be used! All that's left is to write some unit tests to make sure our project is correct and we can publish!

> Note: I realize that tests should be written before/right after code has been written, but to run the tests the bundle must be created first.

## Setting up Mocha and Chai

Let's finish with some tests. Firstly, we need to install the dependencies:

`npm i --save-dev mocha chai`

Then let's make a new directory:

`mkdir test && touch test/test.js`

In this file we will write some tests:

`test/test.js`
```js
var expect = require('chai').expect;
var index = require('../build/bundle.js');

describe('Add function test', () => {
    it('should return 2', () => {
        var result = index.add(1, 1);
        expect(result).to.equal(2);
    });
    it('should return 100', () => {
        var result = index.add(50.5, 49.5);
        expect(result).to.equal(100);
    });
    it('should return -50', () => {
        var result = index.add(-100, 50);
        expect(result).to.equal(-50);
    });
    it('should ignore the third argument', () => {
        var result = index.add(1, 2, 4);
        expect(result).to.equal(3); 
    });
});

describe('Subtract function test', () => {
    it('should return 0', () => {
        var result = index.subtract(1, 1);
        expect(result).to.equal(0);
    });
    it('should return -100', () => {
        var result = index.subtract(0, 100);
        expect(result).to.equal(-100);
    });
    it('should return -1', () => {
        var result = index.subtract(Number.MIN_VALUE, 1);
        expect(result).to.equal(-1);
    });
    it('should return 0.5', () => {
        var result = index.subtract(1, 0.5);
        expect(result).to.equal(0.5);
    });
});
```
Now we can call our npm script to run the tests after we have the project bundled together:

`npm run-script test`

And we can see the tests run to completion!

## Publishing to npm

First, [setup a user account on npm](https://www.npmjs.com/signup).

Then, login to your account on the command line:

`npm login`

After you've logged in you can publish your project to npm with:

`npm publish` 

And that's it! You've successfully created your own Typescript library project that has a full unit testing suite, bundles into one Javascript file, and can be updated on npm with new versions.

For more reading check out the dependencies listed in the first paragraph.

---

Thanks for reading.