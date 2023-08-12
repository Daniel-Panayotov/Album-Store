import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';
import { AlbumService } from '../albums/album.service';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import {
  DocumentData,
  Firestore,
  collection,
  doc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private userService: UserService,
    private albumService: AlbumService,
    private fs: Firestore
  ) {}

  commentOnAlbum(album: DocumentData, comment: string): Observable<void> {
    const newComment = { comment, user: this.userService.userRef };

    album['commentList'].push(newComment);
    return from(this.albumService.updateAlbum(album));
  }

  getComment(albumId: string, commentIndex: number) {
    return this.albumService.getOne(albumId).pipe(
      map((album) => {
        return [album['commentList'][commentIndex], album];
      })
    );
  }

  editComment(album: DocumentData) {
    return from(this.albumService.updateAlbum(album));
  }
}
