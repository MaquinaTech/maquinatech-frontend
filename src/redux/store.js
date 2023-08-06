import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
