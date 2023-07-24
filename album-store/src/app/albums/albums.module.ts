import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAlbumComponent } from './new-album/new-album.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NewAlbumComponent, DetailsComponent, EditAlbumComponent],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class AlbumsModule {}
