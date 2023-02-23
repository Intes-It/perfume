import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@utils/apiRoute';
import { GET } from '@utils/fetch';

interface Favorite {
  id: number | undefined;
  list: any[];
  loading?: boolean;
}

const initialState: Favorite = {
  id: undefined,
  list: [],
  loading: true,
};

export const getFavoriteList = createAsyncThunk('favorite/list', async () => {
  const res = await GET(api.favouriteList);
  return res.data;
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getFavoriteList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getFavoriteList.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.list = payload;
    },
    [getFavoriteList.rejected.toString()]: (state) => {
      state.loading = false;
    },
  },
});

export const { setList } = favoriteSlice.actions;
export default favoriteSlice.reducer;
