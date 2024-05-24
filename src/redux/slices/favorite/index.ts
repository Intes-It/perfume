import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "@types";
import { api } from "@utils/apiRoute";
import axios from "axios";

interface Favorite {
  list: Product[];
  loading?: boolean;
}

const initialState: Favorite = {
  list: [],
};

export const fetchFavoriteList = createAsyncThunk(
  "favorite/fetchFavoriteList",
  async () => {
    try {
      const { data } = await axios.get(api.get_favourite + "?page_size=1000");

      return data?.results || [];
    } catch (error: any) {
      throw new error();
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setList: (state, actions) => {
      state.list = actions.payload;
    },
    addFavoriteItem: (state, actions) => {
      const existExProduct = state.list?.find(
        (item) => item.id === actions.payload.id
      );

      if (existExProduct) return;

      if (state.list?.length > 0) state.list = [...state.list, actions.payload];
      else state.list = [actions.payload];
    },
    removeFavoriteItem: (state, actions) => {
      state.list = state?.list?.filter(
        (item) => item.id !== actions.payload.id
      );
    },
  },
  extraReducers: {
    [fetchFavoriteList.fulfilled.toString()]: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const { setList, addFavoriteItem, removeFavoriteItem } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
