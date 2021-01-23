import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

import { db, storage } from "./firebaseDB";

const SettingFirebaseContext = createContext();

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// var db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  getAllSettings: async () => {
    try {
      let result = [];
      let query = db.collection("settings");
      (await query.get()).forEach((doc) => {
        let data = doc.data();
        result.push({ ...data, id: doc.id });
      });
      return result;
    } catch (error) {
      console.log("Error when getting settings ", error.message);
    }
  },
  getSettingInfo: async (uid) => {
    try {
      const setting = await db.collection("settings").doc(uid).get();

      if (setting.exists) {
        return setting.data();
      } else {
        await db.collection("settings").doc(uid).set({
          allowPush: true,
          theme: true, // dark mode enable
          sound: true,
          snow: false,
          language: "English",
        });
      }
    } catch (error) {
      console.log("Error when getting user info", error);
    }
  },
  updateSetting: async (userId, settingObj) => {
    try {
      await db
        .collection("settings")
        .doc(userId)
        .set({
          ...settingObj,
        });
      console.log(settingObj);
      console.log("Success edit setting");
    } catch (error) {
      console.log("Error when update setting", error.message);
    }
  },
};

const SettingFirebaseProvider = (props) => {
  return (
    <SettingFirebaseContext.Provider value={Firebase}>
      {props.children}
    </SettingFirebaseContext.Provider>
  );
};

export { SettingFirebaseContext, SettingFirebaseProvider };
