import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import user from "@redux/slices/user";
import cart from "./slices/cart";
import favorite from "./slices/favorite";
import options from "./slices/optionProduct";
import toast from "./slices/toast/toastSlice";
import { store } from "./store";
const rootReducer = combineReducers({
  counter,
  user,
  cart,
  favorite,
  toast,
  options,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
