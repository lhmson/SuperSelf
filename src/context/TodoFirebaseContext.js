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
  //   getAllTodos: async () => {
  //     console.log("abc");
  //     try {
  //       let result = [];
  //       let query = db.collection("todos");
  //       (await query.get()).forEach((doc) => {
  //         let data = doc.data();
  //         result.push({ ...data, id: doc.id });
  //       });
  //       return result;
  //     } catch (error) {
  //       console.log("Error when getting all todos ", error.message);
  //     }
  //   },
  createTodo: async (uid, todo) => {
    try {
      let query = await db.collection("todos/" + uid + "/todolist");
      await query.add(todo);
      console.log("Success create my todo");
    } catch (error) {
      console.log("Error when create my todo", error.message);
    }
  },
  getUserTodos: async (uid) => {
    try {
      let listTodos = [];
      let query = await db.collection("todos/" + uid + "/todolist");
      (await query.get()).forEach((doc) => {
        let data = doc.data();
        listTodos.push({ ...data, id: doc.id });
      });
      console.log("Success get todo");
      console.log("new len: ", listTodos.length);
      return listTodos;
    } catch (error) {
      console.log("Error when get my todo", error.message);
    }
  },
  updateTodo: async (uid, todoId, todo) => {
    try {
      let query = await db.collection("todos/" + uid + "/todolist");
      (await query.get()).forEach((doc) => {
        if (doc.id === todoId) {
          query.doc(doc.id).set({
            ...todo,
          });
        }
      });
    } catch (error) {
      console.log("Error when update todo", error.message);
    }
  },
  deleteTodo: async (uid, todoId, todo) => {
    try {
      let query = await db.collection("todos/" + uid + "/todolist");
      (await query.get()).forEach((doc) => {
        if (doc.id == todoId) {
          query.doc(doc.id).delete();
        }
      });
      console.log("Success delete a todo");
    } catch (error) {
      console.log("Error when delete todo", error.message);
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
