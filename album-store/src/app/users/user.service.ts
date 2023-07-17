import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
} from '@angular/fire/firestore';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private fs: Firestore) {
    this.checkUser();
  }

  registerUser(userData: User): Promise<any> {
    return addDoc(collection(this.fs, 'users'), userData);
  }

  checkUser(): void {
    collectionData(collection(this.fs, 'users'), { idField: 'id' }).subscribe(
      (users) => console.log('Stinky!')
    );
  }
}
