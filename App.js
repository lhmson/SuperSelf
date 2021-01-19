import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ChallengeFirebaseProvider } from "./src/context/ChallengeFirbaseContext";
import { UserProvider } from "./src/context/UserContext";
import { UserFirebaseProvider } from "./src/context/UserFirebaseContext";
import { StoryProvider } from "./src/context/StoryContext";
import { StoryFirebaseProvider } from "./src/context/StoryFirebaseContext";
import { Provider } from "react-redux";
import ConfigureStore from "./src/redux/configureStore";
//import { PersistGate } from "redux-persist/es/integration/react";
import { LogBox } from "react-native";
import Main from "./src/navigation/Main";

const store = ConfigureStore();

const App = () => {
  LogBox.ignoreLogs([
    "Setting a timer",
    "VirtualizedLists should never be nested",
  ]);
  LogBox.ignoreLogs(["Animated: `useNativeDriver` was not specified."]);
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  return (
    <UserFirebaseProvider>
      <UserProvider>
        <StoryFirebaseProvider>
          <StoryProvider>
            <ChallengeFirebaseProvider>
              <NavigationContainer>
                <Provider store={store}>
                  {/* <PersistGate loading={<Loading />} persistor={persistor}> */}
                  <Main />
                  {/* </PersistGate> */}
                </Provider>
              </NavigationContainer>
            </ChallengeFirebaseProvider>
          </StoryProvider>
        </StoryFirebaseProvider>
      </UserProvider>
    </UserFirebaseProvider>
  );
};
export default App;
