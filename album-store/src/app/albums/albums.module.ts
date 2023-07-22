import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAlbumComponent } from './new-album/new-album.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewAlbumComponent, DetailsComponent],
  imports: [CommonModule, FormsModule],
})
export class AlbumsModule {}
