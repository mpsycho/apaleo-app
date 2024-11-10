import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromUsers from '../features/users/store/users.reducer';

export interface AppState {
  users: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: fromUsers.usersReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
