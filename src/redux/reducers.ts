import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import user from "@redux/slices/user";
import favorite from "@redux/slices/favorite";

import { store } from "./store";

const rootReducer = combineReducers({ counter, user, favorite });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
