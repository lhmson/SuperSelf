<h1>SuperSelf</h3>

[![superself compliant](https://img.shields.io/badge/self%20development-mobile-brightgreen.svg?style=flat-square)](https://github.com/lhmson/SuperSelf)
[![superself compliant](https://img.shields.io/badge/react%20native-61dafb.svg?style=flat-square)](https://reactnative.dev/)
[![superself compliant](https://img.shields.io/badge/firebase-f8ac2b.svg?style=flat-square)](https://firebase.google.com/)

![GitHub repo size](https://img.shields.io/github/repo-size/lhmson/SuperSelf)
![GitHub contributors](https://img.shields.io/github/contributors/lhmson/SuperSelf) <!--![GitHub stars](https://img.shields.io/github/stars/lhmson/SuperSelf)
![GitHub forks](https://img.shields.io/github/forks/lhmson/SuperSelf)-->
[![Github follow](https://img.shields.io/github/followers/lhmson?label=Follow&style=social)](https://github.com/lhmson)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&color=blue)](https://linkedin.com/in/leesown)

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/src/utils/superself-logo.png?raw=true" alt="SuperSelf logo"></a>
</p>

<h3 align="center">Target for a mobile application 🎯 of Self development training 😎 by React Native</h3>

<p align="center"><i>Note: this is my school project to learn Mobile Application Development, and it got the score of 9.5/10</i></p>

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/PosterOffical.png?raw=true" alt="Poster"></a>
 <i>App Poster</i>
</p>

---

## 📝 Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Install](#install)
- [Usage](#usage)
- [Features](#features)
	- [Todo list](#todo-list)
	- [Challenge](#challenge)
	- [Feeds](#feeds)
	- [Stories](#stories)
	- [World](#world)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [References](#references)
	- [Tools](#tools)
	- [Articles tutorials](#articles-tutorials)
- [Team](#team)
- [Contributing](#contributing)
- [Development](#development)
	- [Progress](#progress)
	- [Suggestion](#suggestion)
- [License](#license)

## Introduction

In the era of this fast-paced society, people need to constantly develop themselves in many aspects of life, especially with the support of technology. Many applications such as [Fabulous](https://www.thefabulous.co/), [Habitify](https://www.habitify.me/), ... help us manage these things. However, this is a new field that can be exploited and further developed, so my team choose to research and implement an app which helps build good habits and motivate personal development, named SuperSelf - Self Development App. The product inherits the strengths of its predecessors, and incorporates a number of interesting features towards the maximum personal development of the user.

Not only a normal [scheduling application](#todo-list), SuperSelf offers users a new and exciting feeling when playing as a character [joining in a private world](#world) and [taking part in challenges](#challenge), collecting experience then unlocking to explore new lands. In addition, the application also has a database of articles and images on [many topics](#feeds) related to personal development (human communication, relationships, motivation, health, expenditure management, goal planning, knowledge, spiritual strength ...). At the same time users can [share short stories](#stories) about themselves (when they set goals, achieve success, ...) - everything is presented in the style of social-network like Facebook.

## Getting Started

### Prerequisites

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

Install Expo and get used to it - a very helpful tool for building universal React app, as it mentions in the [documentation](https://docs.expo.io/get-started/installation/).

```sh
$ npm install -g expo-cli
```

If you want to run the app directly before deploying in iOS or Android, [download Expo Client](https://expo.io/tools#client) on your phone.

Make sure you have downloaded the suitable version of Expo up to now. It should be Expo SDK >= 40.

### Install

1. First, clone this project

```sh
$ git clone https://github.com/lhmson/SuperSelf.git
```

2. Change directory
```sh
$ cd SuperSelf
```

3. Install packages
```sh
$ npm install
```

4. Run the app
```sh
$ npm start
```
or
```sh
$ expo start
```

5. Scan displayed QR code with Expo client

6. Enjoy all features of the app by signing up

## Usage

First you have to have an account. Click Sign up and enter. Just easy as that and you can explore the world of self development

## Features

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/features_diagram.png?raw=true" alt="SuperSelf features drawing"></a>
 <i>SuperSelf features diagram</i>
</p>

### Todo list

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo1.png?raw=true" alt="Demo todo"></a>
 <i>Demo todo</i>
</p>

### Challenge

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo2.png?raw=true" alt="Demo challenge"></a>
 <i>Demo challenge</i>
</p>

### Feeds

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo3.png?raw=true" alt="Demo feeds"></a>
 <i>Demo feeds</i>
</p>

### Stories

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo4.png?raw=true" alt="Demo stories"></a>
 <i>Demo stories</i>
</p>

### World

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo5.png?raw=true" alt="Demo world"></a>
</p>

<p align="center">
	<i>Demo world</i>
</p>

### Others

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo6.png?raw=true" alt="Demo other screen"></a>
 <i>Demo others</i>
</p>

## Project Structure

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/architecture.png?raw=true" alt="SuperSelf architecture"></a>
 <i>Architecture design</i>
</p>

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/screen_flow.png?raw=true" alt="Screen flow"></a>
</p>

<p align="center">
	<i>App Screen Flow</i>
</p>

## Tech Stack

- **Languages**: [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Framework**: [React Native >= 0.63](https://reactnative.dev/)
- **Database Backend Service**: [Firebase (Cloud Firestore)](https://firebase.google.com/)
- **Text Editor**: [Visual Studio Code](https://code.visualstudio.com/)
- **Tool**: [Expo >= SDK 40](https://docs.expo.io/)
- **Version Control System**: [Git](https://git-scm.com/)
- **UI Prototype**: Powerpoint

## References

### Tools

- [Galio UI](https://galio.io/)
- [React Navigation](https://reactnavigation.org/)
- [Expo push notifications](https://docs.expo.io/push-notifications/overview/)
- [Styled components](https://github.com/styled-components/styled-components)
- [React context](https://reactjs.org/docs/context.html)
- [Redux](https://redux.js.org/introduction/getting-started)
- [Lucid chart](https://www.lucidchart.com/pages/)
- [expo vector icon](https://icons.expo.fyi/)
- [Pinterest](https://www.pinterest.com/)
- [Unsplash](https://unsplash.com/)

### Articles tutorials:

- [DesignIntoCode](https://www.youtube.com/channel/UCPZlE8KsMkumnjEMOcJDxuQ)
- [React Native Animation](https://www.youtube.com/playlist?list=PLYxzS__5yYQmdfEyKDrlG5E0F0u7_iIUo)
- [Combining Stack, Tab & Drawer Navigations in React Native With React Navigation 5, Ekunola Ezekiel (2020)](https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da)
- [Realtime Database vs. Cloud Firestore — Which Database is Suitable for your Mobile App, Ashish Sharma (2018)](https://medium.com/datadriveninvestor/realtime-database-vs-cloud-firestore-which-database-is-suitable-for-your-mobile-app-87e11b56f50f)
- [How to Build a React Native App and Integrate It with Firebase, Florian Marcu (2020)](https://www.freecodecamp.org/news/react-native-firebase-tutorial/)

### Team

This project exists thanks to all the people who contribute.

My original team has 2 members, including me: Le Hoang Minh Son (lhmson) and Pham Lien Sanh (sanhlike).
We discuss, select a topic, and specify the software design process, then make a list of features to implement, which has changed many times before we have this product.
<a href="https://github.com/lhmson/superself/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lhmson/SuperSelf" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/lhmson/SuperSelf/issues/new) or submit PRs.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.

## Development

### Progress

Now I am not working on building and maintaining this project. If there comes error when setting up, try to fix it. You can feel free to clone and develop. Should anything wrong happen to Firebase, create a new Cloudstore DB and edit the config file in firebase folder.

### Suggestion
Some examples of functions to implement, these are plans of us and you to extend the app
- Scale number of users while keeping the stability of the app (now up to 100)
- Optimize memory and execution time of functions
- Message among users (like Messenger)
- More elements and maps
- Ranking system, friends,...
- More items for database
- Report user stories
- Users can post articles through censorship
- Comments, number of likes
- and many aspects to generate

## License

GNU
