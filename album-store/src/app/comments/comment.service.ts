import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';
import { AlbumService } from '../albums/album.service';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import { DocumentData, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private userService: UserService,
    private albumService: AlbumService
  ) {}

  commentOnAlbum(albumId: string, comment: string) {
    return this.albumService.getOne(albumId).pipe(
      map((album: DocumentData) => {
        const newComment = { comment, user: this.userService.userRef };

        album['commentList'].push(newComment);
        console.log(2);

        return album;
      })
      // ,switchMap((album) => from(this.albumService.updateAlbum(album)))
    );
  }

  getComment(albumId: string, commentIndex: number) {
    return this.albumService.getOne(albumId).pipe(
      map((album) => {
        return album['commentList'][commentIndex];
      })
    );
  }

  editComment(comment: any, albumId: string, index: number) {
    return this.albumService.getOne(albumId).pipe(
      map((album) => {
        album['commentList'][index] = comment;

        return album;
      })
      // switchMap((album) => from(this.albumService.updateAlbum(album)))
    );
  }
}
