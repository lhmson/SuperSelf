import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

const ChallengeFirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

var db = firebase.firestore();

const ChallengeFirebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },


}
const ChallengeFirebaseProvider = (props) => {
  return (
    <ChallengeFirebaseContext.Provider value={ChallengeFirebase}>
      {props.children}
    </ChallengeFirebaseContext.Provider>
  );
};

export { ChallengeFirebaseContext, ChallengeFirebaseProvider };
