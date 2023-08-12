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
import {
  BehaviorSubject,
  Observable,
  Subject,
  from,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Comment, ProcessedComment } from '../types/comment';
import { AlbumData } from '../types/albumData';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  homeAlbums$$ = new BehaviorSubject<string>('');
  commentDel$$ = new Subject<number>();

  constructor(private fs: Firestore, private userService: UserService) {}

  deleteAlbum(id: string): Promise<void> {
    return deleteDoc(doc(collection(this.fs, 'albums'), id));
  }

  createAlbum(album: Album): Observable<void> {
    const id = doc(collection(this.fs, 'id')).id;
    album.id = id;

    return from(setDoc(doc(collection(this.fs, 'albums'), id), album));
  }

  updateAlbum(album: AlbumData | DocumentData): Promise<void> {
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

  fixRefsInAlbum(album: DocumentData): DocumentData {
    album['commentList'] = album['commentList'].map(
      (comment: ProcessedComment) => {
        comment.user = doc(collection(this.fs, 'users'), comment.user['uid']);
        return comment;
      }
    );

    return album;
  }

  deleteComment(album: DocumentData): Promise<void> {
    return setDoc(doc(collection(this.fs, 'albums'), album['id']), album);
  }

  getOne(id: string): Observable<DocumentData> {
    return docData(doc(this.fs, `albums/${id}`));
  }

  getOnePopulated(id: string): Observable<DocumentData> {
    return docData(doc(this.fs, `albums/${id}`)).pipe(
      switchMap((album: DocumentData) => {
        return album['commentList'][0] ? this.populateOne(album) : of(album);
      })
    );
  }

  populateOne(album: DocumentData): Observable<DocumentData> {
    let commentRefs: string[] = album['commentList'].map(
      (comment: Comment) => comment.user.id
    );

    commentRefs = [...new Set(commentRefs)];

    const usersQuery = query(
      collection(this.fs, 'users'),
      where('uid', 'in', commentRefs)
    );

    let count = 0;
    return collectionData(usersQuery).pipe(
      map((users: DocumentData[]) => {
        if (count == 0) {
          count++;
          album['commentList'] = album['commentList'].map(
            (comment: Comment) => {
              const user = users.find(
                (user: DocumentData) => user['uid'] == comment['user'].id
              );

              return {
                comment: comment['comment'],
                user,
              };
            }
          );
        }
        return album;
      })
    );
  }
}
