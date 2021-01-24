import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebase";

import { db, storage } from "./firebaseDB";

const PostFirebaseContext = createContext();

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// var db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  getAllPosts: async () => {
    console.log("abc");
    try {
      let result = [];
      let query = db.collection("posts");
      (await query.get()).forEach((doc) => {
        let data = doc.data();
        result.push({ ...data, id: doc.id });
      });
      return result;
    } catch (error) {
      console.log("Error when getting all posts ", error.message);
    }
  },
  createPost: async (postObj) => {
    try {
      await db.collection("posts").add({
        ...postObj,
      });
      console.log("Success create post", postObj);
    } catch (error) {
      console.log("Error when create a post", error.message);
    }
  },
  getPostsOfTopic: async (topicId) => {
    try {
      let result = [];
      let query = db.collection("posts");
      (await query.get()).forEach((doc) => {
        let data = doc.data();
        if (data.category.categoryId === topicId) {
          result.push({ ...data, id: doc.id });
        }
      });
      return result;
    } catch (error) {
      console.log("Error when getting post of topic " + topicId, error.message);
    }
  },
  // getLike: async (postId) => {
  //   try {
  //     var likeNumber;

  //     let query = db.collection("posts");
  //     (await query.get()).forEach((doc) => {
  //       if (postId === doc.id) {
  //         let data = doc.data();
  //         likeNumber = data.likes;
  //       }
  //     });
  //     return likeNumber;
  //   } catch (error) {
  //     console.log("Error when get likes number ", error.message);
  //   }
  // },
  // likePost: async (postId, isLike) => {
  //   const like = await Firebase.getLike(postId);
  //   await db
  //     .collection("posts")
  //     .doc(postId)
  //     .update({
  //       likes: isLike === true ? like + 1 : like - 1,
  //     });
  // },
  // deleteOnePostFromFS: async (postId) => {
  //   try {
  //     let query = db.collection("posts");
  //     await query
  //       .doc(postId)
  //       .delete()
  //       .then(() => {
  //         alert("Your post has been deleted successfully!");
  //       })
  //       .catch((e) => console.log("Error when delete post.", e));
  //   } catch (error) {}
  // },
  // deleteOnePost: async (postId) => {
  //   console.log("Current Post Id: ", postId);

  //   let query = db.collection("posts");
  //   await query
  //     .doc(postId)
  //     .get()
  //     .then((documentSnapshot) => {
  //       if (documentSnapshot.exists) {
  //         const { photoUrl } = documentSnapshot.data();

  //         if (photoUrl != null) {
  //           const storageRef = storage.refFromURL(photoUrl);
  //           const imageRef = storage.ref(storageRef.fullPath);

  //           imageRef
  //             .delete()
  //             .then(() => {
  //               console.log(`${photoUrl} has been deleted successfully.`);
  //               Firebase.deleteOnePostFromFS(postId);
  //             })
  //             .catch((e) => {
  //               console.log("Error while deleting the image. ", e);
  //             });
  //           // If the post image is not available
  //         } else {
  //           Firebase.deleteOnePostFromFS(postId);
  //         }
  //       }
  //     });
  // },
};

const PostFirebaseProvider = (props) => {
  return (
    <PostFirebaseContext.Provider value={Firebase}>
      {props.children}
    </PostFirebaseContext.Provider>
  );
};

export { PostFirebaseContext, PostFirebaseProvider };
