import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedActivate } from '../shared/guards/isLogged.activate';
import { NewAlbumComponent } from './new-album/new-album.component';
import { DetailsComponent } from './details/details.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { isOwnerActivate } from '../shared/guards/is-owner.activate';

const routes: Routes = [
  {
    path: 'new',
    canActivate: [isLoggedActivate],
    component: NewAlbumComponent,
  },
  { path: ':id/details', component: DetailsComponent },
  {
    path: ':id/edit',
    canActivate: [isOwnerActivate],
    component: EditAlbumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsRoutingModule {}
