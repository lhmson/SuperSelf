import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { examples } from "./reducers/examples";
import { modalChallengeReducer } from "./reducers/modalChallengeReducer";
import { modalCreateChallengeReducer } from "./reducers/modalCreateChallengeReducer";
//import { persistStore, persistCombineReducers } from "redux-persist";
//import storage from "redux-persist/es/storage";

// const config = {
//   key: "root",
//   storage,
//   debug: true,
// };

const ConfigureStore = () => {
  let store = createStore(
    combineReducers({
      // examples,
      modalChallengeReducer,
      modalCreateChallengeReducer,
    }),
    applyMiddleware(thunk, logger)
  );
  console.log("----");
  //console.log(store.getState());

  //const persistor = persistStore(store);

  //return { persistor, store };
  return store;
};

export default ConfigureStore;
