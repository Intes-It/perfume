import { combineReducers } from 'redux';

import counter from '@redux/slices/counter';
import user from '@redux/slices/user';
import { store } from './store';
import cart from './slices/cart';
import favorite from './slices/favorite';

const rootReducer = combineReducers({ counter, user, cart, favorite });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
