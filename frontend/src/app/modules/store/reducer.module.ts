// reducer.module.ts
import { createReducer, on } from '@ngrx/store';
import { setLoggedIn } from './actions.module';

export const initialState = false;

export const loggedInReducer = createReducer(
  initialState,
  on(setLoggedIn, (state, { loggedIn }) => loggedIn)
);
