import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

import { db, storage } from "./firebaseDB";

const FavoriteFirebaseContext = createContext();

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// var db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  getFavoritePostsOfUser: async (userId) => {
    try {
      var posts = [];

      let query = db.collection("favorites");
      (await query.get()).forEach((doc) => {
        if (userId === doc.id) {
          let data = doc.data();
          posts = data.posts;
        }
      });
      console.log("test");
      return posts;
    } catch (error) {
      console.log("Error when test ", error.message);
    }
  },
  // getContentOneFavPost: async (postId) => {
  //   try {
  //     const post = await db.collection("posts").doc(postId).get();
  //     if (user.exists) {
  //       return user.data();
  //     }
  //   } catch (error) {
  //     console.log("Error when getting fav post ", error);
  //   }
  // },
  // getContentAllFavPosts: async (userId) => {
  //   try {
  //     var postIds = await getFavoritePostsOfUser(userId);
  //     var posts = [];

      
  //     console.log("test", posts);
  //     return posts;
  //   } catch (error) {
  //     console.log("Error when test ", error.message);
  //   }
  // },
  deleteOneFavorite: async (favoriteId) => {
    try {
      let query = db.collection("favorites");
      await query
        .doc(favoriteId)
        .delete()
        .then(() => {
          alert("Your favorite has been deleted successfully!");
        })
        .catch((e) => console.log("Error when delete fav", e));
    } catch (error) {}
  },
  updateFavorites: async (userId, favoriteObj) => {
    try {
      await db
        .collection("favorites")
        .doc(userId)
        .set({
          ...favoriteObj,
        });
      console.log("Success add favorite");
    } catch (error) {
      console.log("Error when add favorite", error.message);
    }
  },
  //   deleteOneFavorite: async (favoriteId) => {
  //     console.log("Current Post Id: ", favoriteId);

  //     let query = db.collection("favorites");
  //     await query
  //       .doc(favoriteId)
  //       .get()
  //       .then((documentSnapshot) => {
  //         if (documentSnapshot.exists) {
  //           const { photoUrl } = documentSnapshot.data();

  //           if (photoUrl != null) {
  //             const storageRef = storage.refFromURL(photoUrl);
  //             const imageRef = storage.ref(storageRef.fullPath);

  //             imageRef
  //               .delete()
  //               .then(() => {
  //                 console.log(`${photoUrl} has been deleted successfully.`);
  //                 Firebase.deleteOneFavoriteFromFS(favoriteId);
  //               })
  //               .catch((e) => {
  //                 console.log("Error while deleting the image. ", e);
  //               });
  //             // If the post image is not available
  //           } else {
  //             Firebase.deleteOneFavoriteFromFS(favoriteId);
  //           }
  //         }
  //       });
  //   },
};

const FavoriteFirebaseProvider = (props) => {
  return (
    <FavoriteFirebaseContext.Provider value={Firebase}>
      {props.children}
    </FavoriteFirebaseContext.Provider>
  );
};

export { FavoriteFirebaseContext, FavoriteFirebaseProvider };
