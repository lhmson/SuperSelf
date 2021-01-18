import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

const TestStoryFirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

var db = firebase.firestore();

var storage = firebase.storage();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  
};

const TestStoryFirebaseProvider = (props) => {
  return (
    <TestStoryFirebaseContext.Provider value={Firebase}>
      {props.children}
    </TestStoryFirebaseContext.Provider>
  );
};

export { TestStoryFirebaseContext, TestStoryFirebaseProvider, storage };
