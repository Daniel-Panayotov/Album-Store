import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users-routing.module').then((m) => m.UsersRoutingModule),
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./albums/albums-routing.module').then(
        (m) => m.AlbumsRoutingModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
