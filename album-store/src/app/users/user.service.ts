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
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private fs: Firestore) {}

  registerUser(userData: User): Promise<any> {
    return addDoc(collection(this.fs, 'users'), userData);
  }

  loginUser(userData: User): void {
    const { email, password } = userData;

    this.findUser(email).subscribe({
      next(user) {
        if (!user[0]) {
          throw new Error();
        }
        if (user[0]['password'] != password) {
          throw new Error();
        }
        //set cookie
      },
      error(err) {
        console.log(err);
      },
    });
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  findUser(email: string): Observable<any> {
    return collectionData(
      query(collection(this.fs, 'users'), where('email', '==', email))
    );
  }
}
