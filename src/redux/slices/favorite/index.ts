import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '@types';
import { api } from '@utils/apiRoute';
import axios from 'axios';

interface Favorite {
  list: Product[];
  loading?: boolean;
}

const initialState: Favorite = {
  list: [],
};

export const fetchFavoriteList = createAsyncThunk('favorite/fetchFavoriteList', async () => {
  try {
    const { data } = await axios.get(api.favouriteList);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setList: (state, actions) => {
      state.list = actions.payload;
    },
    addFavoriteItem: (state, actions) => {
      actions.payload.favorite = true;
      const existExProduct = state.list.find((item) => item.id === actions.payload.id);
      if (existExProduct === undefined || existExProduct === null)
        state.list = [...state.list, actions.payload];
    },
    removeFavoriteItem: (state, actions) => {
      state.list = state.list.filter((item) => item.id !== actions.payload.id);
    },
  },
  extraReducers: {
    [fetchFavoriteList.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
      state.list = payload;
    },
  },
});

export const { setList, addFavoriteItem, removeFavoriteItem } = favoriteSlice.actions;

export default favoriteSlice.reducer;
