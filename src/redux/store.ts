import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './services/pokemon';
import { useDispatch } from 'react-redux';
import favorite from "@redux/slices/favorite";

import rootReducer from './reducers';

export const store = configureStore({
  reducer: {
    rootReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    favorite
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
    }).concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
