import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { AlbumCardComponent } from './album-card/album-card.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [LoaderComponent, AlbumCardComponent, CommentComponent],
  imports: [CommonModule, RouterModule],
  exports: [LoaderComponent, AlbumCardComponent, CommentComponent],
})
export class SharedModule {}
