import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import store from "./state";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"; 
import { Provider } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, store);
const sharedStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={sharedStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
