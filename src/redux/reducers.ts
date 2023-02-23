import { combineReducers } from 'redux';

import counter from '@redux/slices/counter';
import user from '@redux/slices/user';
import { store } from './store';
import cart from './slices/cart';

const rootReducer = combineReducers({ counter, user, cart });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
