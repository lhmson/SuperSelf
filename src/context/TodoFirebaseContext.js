import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

import { db, storage } from "./firebaseDB";

const TodoFirebaseContext = createContext();

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// var db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  getAllTodos: async () => {
    console.log("abc");
    try {
      let result = [];
      let query = db.collection("todos");
      (await query.get()).forEach((doc) => {
        let data = doc.data();
        result.push({ ...data, id: doc.id });
      });
      return result;
    } catch (error) {
      console.log("Error when getting all todos ", error.message);
    }
  },
  createTodo: async (todoObj) => {
    try {
      await db.collection("todos").add({
        ...todoObj,
      });
      console.log("Success create todo", todoObj);
    } catch (error) {
      console.log("Error when create a todo", error.message);
    }
  },
};

const TodoFirebaseProvider = (props) => {
  return (
    <TodoFirebaseContext.Provider value={Firebase}>
      {props.children}
    </TodoFirebaseContext.Provider>
  );
};

export { TodoFirebaseContext, TodoFirebaseProvider };
