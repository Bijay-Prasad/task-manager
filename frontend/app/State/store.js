// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./User/Reducer";
// import taskReducer from "./Task/Reducer";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     tasks: taskReducer,
//   },
// });



import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ Uses localStorage

import userReducer from "./User/Reducer";
import taskReducer from "./Task/Reducer";

// ✅ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "tasks"],
};

// ✅ Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
});

// ✅ Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Create store with middleware and DevTools
const store = legacy_createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
export default store;