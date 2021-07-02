# Chat App
[Chat App](https://user-images.githubusercontent.com/23428563/124265491-098ec300-db36-11eb-97fc-0c4ce73ca8c8.jpeg)

## Project Objective:

To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.


## Features:

* Users can enter their name and choose a background color for the chat screen before joining the chat.
* Displaying the conversation, as well as an input field and submit button.
* Two additional communication features: sending images and location data.
* Data gets stored online and offline.

## Technical Requirements

* React Native.
* Developed using Expo.
* Conversations must be stored in Google Firestore Database.
* Authenticate users anonymously via Google Firebase authentication.
* Images stored in Firebase Cloud Storage
* Read and send the user’s location data.

## Libraries
* React Native
* Expo
* Google Firestore
* Gifted Chat library

## Getting started

### What you need
- Node.js
- Expo Command Line Interface
```
npm install expo-cli --global
```
- Expo account: To create expo an account go to [Expo signup page](https://expo.io/signup)
- To run the app on your mobile device: the Expo mobile app from your device's app store
- To run the app on your machine via a simulator/emulator: 
     - [Android Studio](https://docs.expo.io/workflow/android-studio-emulator/)
     - [iOS Simulator](https://docs.expo.io/workflow/ios-simulator/) (MacOS only)

### Set Up
Install dependencies
```
npm install
```

### Required Libraries

To install all dependencies you can run:
```
npm i --save @react-native-community/async-storage @react-native-community/masked-view @react-native-community/netinfo @react-navigation/native @react-navigation/stack babel-preset-env better-docs expo expo-font expo-image-picker expo-location expo-permissions expo-updates firebase fsevents prop-types react react-dom react-google-maps react-native react-native-gesture-handler react-native-gifted-chat react-native-keyboard-spacer react-native-maps react-native-parsed-text react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg react-native-web react-native-web-maps react-navigaion react-navigation-stack
```
### Run the App

```
expo start
```