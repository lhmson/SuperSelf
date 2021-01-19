import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

const StoryContext = createContext([{}, () => {}]);

const StoryProvider = (props) => {
  const [state, setState] = useState({
    currentlyPostStory: false,
    currentlyDeleteStory: false,
  });

  return (
    <StoryContext.Provider value={[state, setState]}>
      {props.children}
    </StoryContext.Provider>
  );
};

export { StoryContext, StoryProvider };
