import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

const ChallengeContext = createContext([{}, () => {}]);

const ChallengeProvider = (props) => {
  const [state, setState] = useState({
    currentlyUpdateChallenge: false,
    currentlyAddChallenge : false,
    currentlyDeleteChallenge : false,
  });

  return (
    <ChallengeContext.Provider value={[state, setState]}>
      {props.children}
    </ChallengeContext.Provider>
  );
};

export { ChallengeContext, ChallengeProvider };
