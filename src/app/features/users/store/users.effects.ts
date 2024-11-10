import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersActions } from './users.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users: users })),
          catchError((error) => {
            console.error('loadUsers effect caught an error:', error.message);
            return of(UsersActions.loadUsersFailure({ error: error.message }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
