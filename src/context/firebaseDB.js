import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

var firestore = firebase.firestore;

var db = firebase.firestore();

var storage = firebase.storage();

export { db, storage, firestore };
