import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { AlbumService } from 'src/app/albums/album.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment: DocumentData = [];
  @Input() index: number = 0;

  constructor(private albumService: AlbumService) {
    setTimeout(() => {
      console.log(this.comment);
    }, 3000);
  }

  async deleteComment(): Promise<void> {
    this.albumService.commentDel$$.next(this.index);
  }

  get user() {
    return this.comment['user'];
  }
}
