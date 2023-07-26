import { Component, Input, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { AlbumService } from 'src/app/albums/album.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: DocumentData = [];
  @Input() index: number = 0;
  @Input() user: any;

  isOwner: boolean = false;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    console.log(this.comment, this.user);
    this.isOwner = this.owner.uid == this.user['user_id'] ? true : false;
  }

  async deleteComment(): Promise<void> {
    this.albumService.commentDel$$.next(this.index);
  }

  get owner() {
    return this.comment['user'];
  }
}
