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
        result.push({...data, id: doc.id});
      });
      return result;
    } catch (error) {
      console.log("Error when getting all stories ", error.message);
    }
  },
  getStoryOfUser: async (userId) => {
    try {
      let result = [];
      let query = db.collection("stories");
      (await query.get()).forEach((doc) => {
        let data = doc.data();
        if (data.user.userId === userId) {
          result.push({ ...data, id: doc.id });
        }
      });
      return result;
    } catch (error) {
      console.log("Error when getting story of user" + userId, error.message);
    }
  },
  deleteOneStoryFromFS: async (storyId) => {
    try {
      let query = db.collection("stories");
      await query
        .doc(storyId)
        .delete()
        .then(() => {
          alert("Your post has been deleted successfully!");
        })
        .catch((e) => console.log("Error when delete post.", e));
    } catch (error) {}
  },
  deleteOneStory: async (storyId) => {
    console.log("Current Post Id: ", storyId);

    let query = db.collection("stories");
    await query
      .doc(storyId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { photoUrl } = documentSnapshot.data();

          if (photoUrl != null) {
            const storageRef = storage.refFromURL(photoUrl);
            const imageRef = storage.ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${photoUrl} has been deleted successfully.`);
                Firebase.deleteOneStoryFromFS(storyId);
              })
              .catch((e) => {
                console.log("Error while deleting the image. ", e);
              });
            // If the post image is not available
          } else {
            Firebase.deleteOneStoryFromFS(storyId);
          }
        }
      });
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
