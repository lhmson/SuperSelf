import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ChallengeFirebaseProvider } from "./src/context/ChallengeFirbaseContext";
import { UserProvider } from "./src/context/UserContext";
import { UserFirebaseProvider } from "./src/context/UserFirebaseContext";
import { StoryProvider } from "./src/context/StoryContext";
import { StoryFirebaseProvider } from "./src/context/StoryFirebaseContext";
import { PostProvider } from "./src/context/PostContext";
import { PostFirebaseProvider } from "./src/context/PostFirebaseContext";
import { FavoriteFirebaseProvider } from "./src/context/FavoriteFirebaseContext";
import { ChallengeProvider } from "./src/context/ChallengeContext";
import { GameFirebaseProvider } from "./src/context/GameFirebaseContext";

import { Provider } from "react-redux";
import ConfigureStore from "./src/redux/configureStore";
//import { PersistGate } from "redux-persist/es/integration/react";
import { LogBox } from "react-native";
import Main from "./src/navigation/Main";
import { FavoriteFirebaseContext } from "./src/context/FavoriteFirebaseContext";
import { TodoFirebaseProvider } from "./src/context/TodoFirebaseContext";
import { TodoProvider } from "./src/context/TodoContext";
import { SettingProvider } from "./src/context/SettingContext";
import { SettingFirebaseProvider } from "./src/context/SettingFirebaseContext";

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
        <SettingFirebaseProvider>
          <SettingProvider>
            <StoryFirebaseProvider>
              <StoryProvider>
                <PostFirebaseProvider>
                  <PostProvider>
                    <FavoriteFirebaseProvider>
                      <TodoFirebaseProvider>
                        <TodoProvider>
                          <ChallengeFirebaseProvider>
                            <ChallengeProvider>
                              <GameFirebaseProvider>
                                <NavigationContainer>
                                  <Provider store={store}>
                                    {/* <PersistGate loading={<Loading />} persistor={persistor}> */}
                                    <Main />
                                    {/* </PersistGate> */}
                                  </Provider>
                                </NavigationContainer>
                              </GameFirebaseProvider>
                            </ChallengeProvider>
                          </ChallengeFirebaseProvider>
                        </TodoProvider>
                      </TodoFirebaseProvider>
                    </FavoriteFirebaseProvider>
                  </PostProvider>
                </PostFirebaseProvider>
              </StoryProvider>
            </StoryFirebaseProvider>
          </SettingProvider>
        </SettingFirebaseProvider>
      </UserProvider>
    </UserFirebaseProvider>
  );
};
export default App;
