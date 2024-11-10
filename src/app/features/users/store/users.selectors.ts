import { createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { AppState } from '../../../reducers';

export const selectUsers = (state: AppState) => state.users;
// TODOO
export const selectUsersList = createSelector(
  selectUsers,
  (state: UsersState) => state.users
);
