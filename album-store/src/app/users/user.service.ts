import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  setDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private fs: Firestore) {
    this.findUser('abdull_100@abv.bg').subscribe((v) => console.log(v));
  }

  registerUser(userData: User): Promise<any> {
    return addDoc(collection(this.fs, 'users'), userData);
  }

  loginUser(userData: User) {
    const { email, password } = userData;

    this.findUser(email).subscribe({
      next(user) {
        if (!user[0]) {
          throw 'wrong email';
        }
        if (user[0]['password'] != password) {
          throw 'wrong password';
        }
        //set cookie
      },
      error(err) {
        console.log(err);
      },
    });
  }

  findUser(email: string) {
    return collectionData(
      query(collection(this.fs, 'users'), where('email', '==', email))
    );
  }
}
