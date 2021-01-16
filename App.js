import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import { FirebaseProvider } from "./src/context/FirebaseContext";
import { ChallengeFirebaseProvider } from "./src/context/ChallengeFirbaseContext";

import { Provider } from "react-redux";
import ConfigureStore from "./src/redux/configureStore";
//import { PersistGate } from "redux-persist/es/integration/react";
import Loading from "./src/components/Loading";
import { LogBox } from "react-native";
import Main from "./src/navigation/Main";

const store = ConfigureStore();

const App = () => {
  LogBox.ignoreLogs(["Setting a timer","VirtualizedLists should never be nested"]);
  LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  
  return (
    <FirebaseProvider>
      <UserProvider>
        <ChallengeFirebaseProvider>
        <NavigationContainer>
          <Provider store={store}>
            {/* <PersistGate loading={<Loading />} persistor={persistor}> */}
            <Main />
            {/* </PersistGate> */}
          </Provider>
        </NavigationContainer>
        </ChallengeFirebaseProvider>
      </UserProvider>
    </FirebaseProvider>
  );
};
export default App;
