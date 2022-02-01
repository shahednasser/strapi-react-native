# How to Create a Notes App with Strapi v4 and React Native

Code for How to Create a Notes App with Strapi v4 and React Native tutorial.

## Installation

Change to the `strapi` directory and run:

```bash
npm i
```

Then change to the `notes-app` directory and run:

```bash
npm i
```

## Set IP

In `notes-app/screens/HomeScreen.js` and `notes-app/screens/EditorScreen.js` change `<IP>` to your machine's network IP.

## Run the App

You first need to run the Strapi backend so change to the `strapi` backend and run the following:

```bash
npm run develop
```

Then, go to the `notes-app` directory and run the following:

```bash
npm start
```

You'll then be able to open the app using [Expo Go](https://expo.dev/client).
