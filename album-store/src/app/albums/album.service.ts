import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Album } from '../types/album';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private fs: Firestore) {}

  createAlbum(album: Album): Promise<void> {
    const id = doc(collection(this.fs, 'id')).id;
    album.uid = id;
    return setDoc(doc(collection(this.fs, 'albums'), id), album);
  }
}
