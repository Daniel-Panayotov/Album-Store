import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlbumCardComponent } from './album-card/album-card.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [AlbumCardComponent, CommentComponent],
  imports: [CommonModule, RouterModule],
  exports: [AlbumCardComponent, CommentComponent],
})
export class SharedModule {}
