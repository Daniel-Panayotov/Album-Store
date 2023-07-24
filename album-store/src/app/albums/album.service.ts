import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  collectionData,
  DocumentData,
  where,
  query,
  docData,
} from '@angular/fire/firestore';
import { Album } from '../types/album';
import { Observable, map, of, switchMap } from 'rxjs';
import { Comment } from '../types/comment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private fs: Firestore) {}

  createAlbum(album: Album): Promise<void> {
    return setDoc(doc(collection(this.fs, 'albums')), album);
  }

  getAll(): Observable<DocumentData[]> {
    return collectionData(collection(this.fs, 'albums'), { idField: 'id' });
  }

  getOnePopulated(id: string): Observable<DocumentData> {
    return docData(doc(this.fs, `albums/${id}`), { idField: 'id' }).pipe(
      switchMap((album: DocumentData) =>
        album['commentList'][0] ? this.getWithComments(album) : of(album)
      )
    );
  }

  getOne(id: string): Observable<DocumentData> {
    return docData(doc(this.fs, `albums/${id}`), { idField: 'id' });
  }

  getWithComments(album: DocumentData): Observable<DocumentData> {
    const commentRefs: string[] = album['commentList'].map(
      (comment: Comment) => comment.user.id
    );

    const usersQuery = query(
      collection(this.fs, 'users'),
      where('uid', 'in', commentRefs)
    );

    return collectionData(usersQuery).pipe(
      map((users: DocumentData[]) => {
        album['commentList'] = album['commentList'].map((comment: Comment) => {
          const user = users.find(
            (user: DocumentData) => user['uid'] == comment['user'].id
          );

          return {
            comment: comment['comment'],
            user,
          };
        });

        return album;
      })
    );
  }
}
