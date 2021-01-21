import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

const PostContext = createContext([{}, () => {}]);

const PostProvider = (props) => {
  const [state, setState] = useState({
    currentlyUpdate: false,
    currentlyLikeOrUnlikePost: false,
  });

  return (
    <PostContext.Provider value={[state, setState]}>
      {props.children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
