import { createAction, props } from '@ngrx/store';

export const setLoggedIn = createAction(
  '[Auth] Set Logged In',
  props<{ loggedIn: boolean }>()
);


