import { createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { User } from '../services/users.service';

export interface UsersState {
  users: User[];
  error: string | null;
  status: string;
}

export const initialState: UsersState = {
  users: [],
  error: null,
  status: 'idle',
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({ ...state, status: 'loading' })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
    error: null,
    status: 'success',
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
