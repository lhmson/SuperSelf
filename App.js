import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import { FirebaseProvider } from "./src/context/FirebaseContext";
import { LogBox } from "react-native";

import AppStackNavigator from "./src/navigation/AppStackNavigator";

const App = () => {
  LogBox.ignoreLogs(["Setting a timer"]);
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  );
};
export default App;
