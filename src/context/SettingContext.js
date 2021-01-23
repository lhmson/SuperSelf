import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

const SettingContext = createContext([{}, () => {}]);

const SettingProvider = (props) => {
  const [state, setState] = useState({
    theme: true, // dark mode enable
    allowPush: true,
    sound: true,
    snow: false,
    language: "English",
  });

  return (
    <SettingContext.Provider value={[state, setState]}>
      {props.children}
    </SettingContext.Provider>
  );
};

export { SettingContext, SettingProvider };
