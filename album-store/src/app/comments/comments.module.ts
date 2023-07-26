import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewCommentComponent, EditCommentComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class CommentsModule {}
