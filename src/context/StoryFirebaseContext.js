import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

import { db, storage } from "./firebaseDB";

const StoryFirebaseContext = createContext();

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// var db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  getAllStories: async () => {
    try {
      let result = [];
      let query = db.collection("stories");
      (await query.get()).forEach((doc) => {
        let data = doc.data();
        result.push(data);
      });
      return result;
    } catch (error) {
      console.log("Error when getting all stories ", error.message);
    }
  },
};

const StoryFirebaseProvider = (props) => {
  return (
    <StoryFirebaseContext.Provider value={Firebase}>
      {props.children}
    </StoryFirebaseContext.Provider>
  );
};

export { StoryFirebaseContext, StoryFirebaseProvider };
