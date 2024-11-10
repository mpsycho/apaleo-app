import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then(
        (m) => m.UsersModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: '**', pathMatch: 'full', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
