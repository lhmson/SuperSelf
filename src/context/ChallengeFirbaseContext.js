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

  getSomethingDocChallenge: async () => {
      try {
        var Description  = "";

        let query = db.collection("Challenge");
        (await query.get()).forEach(doc =>{  let data = doc.data();
          Description =  data.Description;
        })
        return Description;
      }catch (error)
      {
        console.log("Error when test ", error.message);
      }
  },

  getAllChallenge: async () => {
    try {
      let result = [];
      let query = db.collection("Challenge");
      (await query.get()).forEach(doc =>
        {  
          let data = doc.data();
          result.push(data);
        })
      return result;
    }catch (error)
    {
      console.log("Error when test ", error.message);
    }
  },

  createChallenge: async (key,challengeObject) => {
    try {
     await db.collection("Challenge").doc(key).set({
        ...challengeObject
      });
      console.log("Success create challenge");
    }catch (error)
    {
      console.log("Error when create a document", error.message);
    }
  },

  getListMyChallenges: async (uid) => {
    try {
      console.log("\nok1");
      let query = db.collection("MyChallenge");
      let listChallenges;

      (await query.get()).forEach(doc =>{ 
        let json = doc.data();
        console.log("Document data:", json);
        console.log("Document keys:", Object.keys(json));
        console.log("\nkey " + doc.key);
      })

      return Description;
    }catch (error)
    {
      console.log("Error when test ", error.message);
    }
  },

  getMyChallenge: async (uid) => {
    try {
      let listChallenges = [];
      let query =  await db.collection("MyChallenge/" + uid + "/ListChallenge");
      (await query.get()).forEach(doc =>{ 
          let data = doc.data();
          listChallenges.push({...data, id: doc.id});
      })
      console.log("Success get my challenge");
      return listChallenges;
    } catch (error)
    {
      console.log("Error when get a my challenge", error.message);
    }
  },

  createMyChallenge: async (uid, challenge) => {
    try {
      let listChallenges = [];
      let query =  await db.collection("MyChallenge/" + uid + "/ListChallenge");
      (await query.add(challenge));
      console.log("Success create my challenge");
    } catch (error)
    {
      console.log("Error when create a my challenge", error.message);
    }
  }
}

const ChallengeFirebaseProvider = (props) => {
  return (
    <ChallengeFirebaseContext.Provider value={ChallengeFirebase}>
      {props.children}
    </ChallengeFirebaseContext.Provider>
  );
};

export {ChallengeFirebaseContext, ChallengeFirebaseProvider};
