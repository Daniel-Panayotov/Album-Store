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
  Query,
  CollectionReference,
  deleteDoc,
} from '@angular/fire/firestore';
import { Album } from '../types/album';
import { BehaviorSubject, Observable, Subject, map, of, switchMap } from 'rxjs';
import { Comment } from '../types/comment';
import { AlbumData } from '../types/albumData';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  homeAlbums$$ = new BehaviorSubject<string>('');
  commentDel$$ = new Subject<number>();

  constructor(private fs: Firestore) {}

  deleteAlbum(id: string): Promise<void> {
    return deleteDoc(doc(collection(this.fs, 'albums'), id));
  }

  createAlbum(album: Album): Promise<void> {
    const id = doc(collection(this.fs, 'id')).id;
    album.id = id;
    return setDoc(doc(collection(this.fs, 'albums'), id), album);
  }

  updateAlbum(album: AlbumData): Promise<void> {
    const id = album.id;

    return setDoc(doc(collection(this.fs, 'albums'), id), album);
  }

  getAll(search: string): Observable<DocumentData[]> {
    let albumQuery: Query | CollectionReference<DocumentData> = collection(
      this.fs,
      'albums'
    );

    if (search != '') {
      albumQuery = query(
        collection(this.fs, 'albums'),
        where('band', 'in', [search])
      );
    }
    return collectionData(albumQuery);
  }

  getOne(id: string): Observable<DocumentData> {
    return docData(doc(this.fs, `albums/${id}`));
  }

  deleteComment(id: number) {}

  getOnePopulated(id: string): Observable<DocumentData> {
    return docData(doc(this.fs, `albums/${id}`)).pipe(
      switchMap((album: DocumentData) =>
        album['commentList'][0] ? this.getWithComments(album) : of(album)
      )
    );
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
