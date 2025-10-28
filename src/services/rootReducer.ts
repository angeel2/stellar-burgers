import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  orders: orderReducer,
  burgerConstructor: burgerConstructorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
