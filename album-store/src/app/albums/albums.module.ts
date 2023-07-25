import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAlbumComponent } from './new-album/new-album.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { RouterModule } from '@angular/router';
import { CommentComponent } from '../shared/comment/comment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewAlbumComponent, DetailsComponent, EditAlbumComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
})
export class AlbumsModule {}
