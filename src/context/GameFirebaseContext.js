import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

const GameFirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

var db = firebase.firestore();

const GameFirebase = {
   getAllChallenge: async () => {
    try {
      let result = [];
      let query = db.collection("Challenge");
      (await query.get()).forEach((doc) => {
        let data = doc.data();
        result.push({...data, id : doc.id});
      });
      return result;
    } catch (error) {
      console.log("Error when test ", error.message);
    }
  },

  createChallenge: async (key, challengeObject) => {
    try {
      await db
        .collection("Challenge")
        .doc(key)
        .set({
          ...challengeObject,
        });
      console.log("Success create challenge");
    } catch (error) {
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

  getMyGameStatus: async (uid) => {
    try {  
      let status;
      let query =  await db.collection("GameGlobal");
      await query.doc(uid).get().then(function(doc) {
            if (doc.exists) 
            {
                status = doc.data();
            } else 
            {
                status = GameFirebase.createGameStatus(uid);
            }
        }).catch(function(error) {
        console.log("Error getting document:", error);
        });
    return status;
    } catch (error)
    {
      console.log("Error when get a my game", error.message);
    }
  },

  createGameStatus: async (uid) => {
    try {
      const valueInit = {
        LandsMap : [],
        Snow : false,
        experiences : 0,
        level : 1,
        air : 0,
        metal : 0,
        water : 0,
        fire : 0,
        earth : 0,
        plan : 0, 
        coins : 1000,   
        Require : {Water: 50, Plan : 30, Metal : 40}, 
    }

    let query =  await db.collection("GameGlobal");
      
    (await query.doc(uid).set(valueInit));

    return valueInit;

    console.log("Success init my game status");

    } catch (error)
    {
      console.log("Error init my game status", error.message);
    }
  },

  updateGameStatus : async (uid, gameStatus) => {
    try {
        let query =  await db.collection("GameGlobal");
        (await query.doc(uid).set(gameStatus));
  
        console.log("Success update my game status");
      } catch (error)
      {
        console.log("Error update my game status", error.message);
      }
  },

  updateGameLevelCoins : async (uid, ex, coins) =>
  {
    let oldStatus = await GameFirebase.getMyGameStatus(uid);
    let oldex = oldStatus.experiences;
    let oldlevel = oldStatus.level;
    let newlevel = Math.round(oldlevel + (ex / 10));
    let newex = ex % 10;
    let newcoins = coins + oldStatus.coins;

    oldStatus = {...oldStatus, level : newlevel, experiences : newex, coins : newcoins};
    await GameFirebase.updateGameStatus(uid,oldStatus);
  },

  updateGameElement : async (uid, name, number) =>
  {
    let oldStatus = await GameFirebase.getMyGameStatus(uid);
    let eleWater = oldStatus.water;
    let eleMetal = oldStatus.metal;
    let elePlan = oldStatus.plan;
    
    if (name == "Water")
    {
        oldStatus = {...oldStatus, water : eleWater + number};
    }
    if (name == "Plan")
    {
        oldStatus = {...oldStatus, plan : elePlan + number};
    }
    if (name == "Metal")
    {
        oldStatus = {...oldStatus, metal : eleMetal + number};
    }
   
    await GameFirebase.updateGameStatus(uid,oldStatus);
  },
}

const GameFirebaseProvider = (props) => {
  return (
    <GameFirebaseContext.Provider value={GameFirebase}>
      {props.children}
    </GameFirebaseContext.Provider>
  );
};

export { GameFirebaseContext, GameFirebaseProvider };
