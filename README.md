# Password Generator App

This is a simple password generator app that generates a random password based on user selecteable parameters such as length, lowercase, uppercase, numeric, and/or special characters. The package used is the [random](https://www.npmjs.com/package/random) npm library, which uses `Math.random()` as the underlying PRNG. The app also provides a strength rating for the generated password.

#### [Click here to view live project](https://password-generator-app-sable.vercel.app/)

#### Screenshots

<div align="center">
  <img src="./src/images/app-weak-strength.png" alt="screenshot of app" width='125px'></img>
  <img src="./src/images/app-medium-strength.png" alt="screenshot of app" width='125px'></img>
  <img src="./src/images/app-strong-strength.png" alt="screenshot of app" width='125px'></img>
  <img src="./src/images/app-crypto-strength.png" alt="screenshot of app" width='125px'></img>
</div>

#### Technologies used:

- [Create-T3-App](https://create-t3-app-docs.vercel.app/en/introduction)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [NextJS](https://nextjs.org/docs/getting-started)
- [random](https://www.npmjs.com/package/random) npm library
- [Vercel](https://vercel.com/)

This is a challenge from [frontendmentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh).

**Here is the challenge brief:**

Your challenge is to build out this password generator app and get it looking as close to the design as possible. Sketch and Figma files are provided.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

-Generate a password based on the selected inclusion options
-Copy the generated password to the computer's clipboard
-See a strength rating for their generated password
-View the optimal layout for the interface depending on their device's screen size
-See hover and focus states for all interactive elements on the page
