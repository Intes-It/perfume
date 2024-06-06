import { createSlice } from "@reduxjs/toolkit";

export type optionsType = {
  color: {
    color: string;
    current_price: number;
    id: number;
    name: string;
    price: number;
  };
  capacity: {
    current_price?: number;
    id: number;
    name: string;
    price: number;
  };
  package: { current_price?: number; id: number; name: string; price: number };
  image: string;
  currId: string;
  isSave: boolean;
};

const initialState: optionsType | null = null;
const optionProductSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOptions: (state, actions) => {
      state = actions.payload;
      return state;
    },
    saveOptions: (state: any) => {
      state = {
        ...state,
        isSave: true,
      };
      return state;
    },
    removeOptions: (state) => {
      state = null;
      return state;
    },
  },
});

export const { addOptions, removeOptions, saveOptions } =
  optionProductSlice.actions;
export default optionProductSlice.reducer;
