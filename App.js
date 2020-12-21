import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import { FirebaseProvider } from "./src/context/FirebaseContext";

import { Provider } from "react-redux";
import ConfigureStore from "./src/redux/configureStore";
//import { PersistGate } from "redux-persist/es/integration/react";
import Loading from "./src/components/Loading";
import { LogBox } from "react-native";
import Main from "./src/navigation/Main";

const store = ConfigureStore();

const App = () => {
  LogBox.ignoreLogs(["Setting a timer","VirtualizedLists should never be nested"]);
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <Provider store={store}>
            {/* <PersistGate loading={<Loading />} persistor={persistor}> */}
            <Main />
            {/* </PersistGate> */}
          </Provider>
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  );
};
export default App;
