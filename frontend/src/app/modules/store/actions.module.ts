// actions.ts
import { createAction } from '@ngrx/store';

export const setLoggedIn = createAction('[Auth] Set Logged In', (loggedIn: boolean) => ({ loggedIn }));
