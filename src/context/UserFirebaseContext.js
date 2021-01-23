import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

import { db, storage } from "./firebaseDB";

const UserFirebaseContext = createContext();

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// var db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  createUser: async (user) => {
    console.log(db);
    try {
      console.log(
        "User:" + user.username + " " + user.password + " " + user.email
      );
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;
      let profilePhotoUrl = "default";
      console.log("uid:" + uid);
      await db.collection("users").doc(uid).set({
        username: user.username,
        email: user.email,
        profilePhotoUrl,
        birthday: new Date(),
        gender: "Male",
      });

      if (user.profilePhoto) {
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
      }
      //delete user.password;
      return { ...user, profilePhotoUrl, uid };
    } catch (error) {
      alert("Error when creating user, please try again. " + error.message);
      console.log("Error when creating user ", error.message);
      return null;
    }
  },

  uploadProfilePhoto: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;
    //console.log(uid);
    try {
      const photo = await Firebase.getBlob(uri);
      const imageRef = storage.ref("profilePhotos").child(uid);
      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      //console.log("Url: " + url);

      await db.collection("users").doc(uid).update({
        profilePhotoUrl: url,
      });
      return url;
    } catch (error) {
      console.log("Error when uploading profile photo ", error.message);
    }
  },

  getBlob: async (uri) => {
    //console.log("Uri get blob: " + uri);
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request fails"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection("users").doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log("Error when getting user info", error);
    }
  },

  logInWithGoogle: async () => {
    try {
    } catch (error) {
      console.log("Error when logging in with google" + error.message);
    }
  },

  logIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  logOut: async () => {
    try {
      await firebase.auth().signOut();

      return true;
    } catch (error) {
      console.log("Error when logging out ", error);
    }
    return false;
  },
};

const UserFirebaseProvider = (props) => {
  return (
    <UserFirebaseContext.Provider value={Firebase}>
      {props.children}
    </UserFirebaseContext.Provider>
  );
};

export { UserFirebaseContext, UserFirebaseProvider };
