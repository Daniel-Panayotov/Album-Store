import { Injectable, OnInit } from '@angular/core';
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
} from '@angular/fire/auth';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private fs: Firestore) {}

  ngOnInit(): void {}

  registerUser(userData: User): Promise<any> {
    const { email, password } = userData;

    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password);
  }

  loginUser(userData: User): Promise<any> {
    const { email, password } = userData;

    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password);
  }

  logout(): Promise<void> {
    const auth = getAuth();
    return signOut(auth);
  }
}
