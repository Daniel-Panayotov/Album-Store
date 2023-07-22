import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedActivate } from '../shared/guards/isLogged.activate';
import { NewAlbumComponent } from './new-album/new-album.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: 'new',
    canActivate: [isLoggedActivate],
    component: NewAlbumComponent,
  },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsRoutingModule {}
