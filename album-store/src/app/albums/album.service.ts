import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  collectionData,
  DocumentData,
} from '@angular/fire/firestore';
import { Album } from '../types/album';
import { Observable } from 'rxjs';

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
}
