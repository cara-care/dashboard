# Contributing

We would love for you to contribute to our dashboard and help it make better!
Here are some guidelines to help you with the contribution:

- [Contributing](#contributing)
  - [Project setup](#project-setup)
    - [Available Scripts](#available-scripts)
      - [`yarn start`](#yarn-start)
      - [`yarn test`](#yarn-test)
    - [Internationalization](#internationalization)
  - [Found a Bug?](#found-a-bug)
  - [First Pull Request](#first-pull-request)

## Project setup

**You’ll need to have Node >= 8.10 on your local development machine**

1. Fork and clone the repository
2. run `yarn` to install the dependencies
3. run `cp .example.env .env` to create necessary environment variables for the development

### Available Scripts

In the project directory, you can now run:

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.

### Internationalization

This project uses [react-intl](https://github.com/formatjs/react-intl) library for Internationalization. Check out the repos documentation for more information of how it works. In a nutshell - all the localized strings are in `src/locale` directory and you have access to them via either intl prop or "Formated" components. In case you would like to add some text, please add a new key(s) to `<locale>.json`.

A sample scenario for adding a new key:

1. Add a key(s) to `src/locale/en.json`. The naming convetion for the keys are <module/location>. (camelCased) e.g.:

   ```
   // src/locale/en.json
   {
     ...
     "example.helloWorld": "Hello, world!"
   }
   ```

2. Use `<FormattedMessage />` component from react-intl to display the text

   ```
   import React from 'react';
   import { FormattedMessage } from 'react-intl';

   const Example = () => {
     return (
       <div>
         <FormattedMessage id="example.helloWorld" defaultMessage="Hello, world!" />
       </div>
     )
   }

   export default Example;
   ```

## Found a Bug?

If you found a bug, you can help us by opening an issue in our GitHub repository, or even better, you can submit a pull request with a fix.

## First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

You can also find a list of [good first issues](https://github.com/cara-care/dashboard/issues?q=is:open+is:issue+label:%22good+first+issue%22) that are approachable for the newcomers.
