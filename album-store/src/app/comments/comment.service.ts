import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';
import { AlbumService } from '../albums/album.service';
import { Observable, from, map, switchMap } from 'rxjs';
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
        return album;
      })
      // switchMap((album) => from(this.albumService.updateAlbum(album)))
    );
  }
}
