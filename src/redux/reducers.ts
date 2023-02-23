import { combineReducers } from 'redux';

import counter from '@redux/slices/counter';
import user from '@redux/slices/user';
import { store } from './store';

const rootReducer = combineReducers({ counter, user });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
