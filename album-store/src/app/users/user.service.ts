import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { User } from '../types/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = !!localStorage.getItem(environment.TOKEN_KEY);
  unsub: () => void = () => {};

  constructor(private fs: Firestore) {
    this.setAuthObservable();
  }

  setAuthObservable(): void {
    const auth = getAuth();

    const unsub = auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          try {
            const jwt = await auth.currentUser?.getIdToken();

            localStorage.setItem(environment.TOKEN_KEY, jwt as string);
          } catch (err) {
            console.log(err);
          }
        } else {
          localStorage.removeItem(environment.TOKEN_KEY);
        }

        this.isLoggedIn = !!localStorage.getItem(environment.TOKEN_KEY);
      },
      (err) => console.log(err)
    );

    this.unsub = unsub;
  }

  registerUser(userData: User): Promise<UserCredential> {
    const { email, password } = userData;

    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password);
  }

  loginUser(userData: User): Promise<UserCredential> {
    const { email, password } = userData;

    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password);
  }

  logout(): Promise<void> {
    const auth = getAuth();
    return signOut(auth);
  }
}
