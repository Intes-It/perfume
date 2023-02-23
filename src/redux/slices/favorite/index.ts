import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@utils/apiRoute';
import axios from 'axios';

interface Favorite {
  list: any[];
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
      state.list = [...state.list, actions.payload];
    },
    removeFavoriteItem: (state, actions) => {
      state.list = actions.payload;
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
