import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  collection,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile,
} from '@angular/fire/auth';
import { User } from '../types/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalstorageService } from '../services/localstorage.service';
import { Observable, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userToken: string | null = this.LsService.getToken();
  auth = getAuth();

  constructor(
    private fs: Firestore,
    private jwtHelper: JwtHelperService,
    private LsService: LocalstorageService
  ) {
    this.setAuthObservable();
    this.isTokenExpired();
  }

  private isTokenExpired() {
    if (this.jwtHelper.isTokenExpired(this.userToken)) {
      this.LsService.clearToken();
    }
  }

  private setAuthObservable(): void {
    this.auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          try {
            const token = this.LsService.getToken();
            const jwt = await user.getIdToken();

            this.LsService.setToken(jwt);
            if (token != jwt && token != null) {
              this.LsService.clearToken();
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          this.LsService.clearToken();
        }

        this.userToken = this.LsService.getToken();
      },
      (err) => console.log(err)
    );
  }

  updateUserProfile(displayName: string, photoURL: string): Observable<void> {
    const user = this.auth.currentUser;

    if (user) {
      return from(updateProfile(user, { displayName, photoURL }));
    }
    return of();
  }

  updateUserDbEntry(user: DocumentData): Observable<void> {
    return from(setDoc(this.userRef, user));
  }

  getUser(): Observable<DocumentData> {
    return docData(this.userRef);
  }

  get userRef(): DocumentReference<DocumentData> {
    return doc(collection(this.fs, 'users'), this.userData['user_id']);
  }

  get userData(): any | null {
    let val = null;

    if (this.userToken) {
      val = this.jwtHelper.decodeToken(this.userToken);
    }
    return val;
  }

  refreshToken(): Promise<string> | undefined {
    return this.auth.currentUser?.getIdToken(true);
  }

  createUserDbEntry(userData: UserCredential): Promise<void> {
    const { displayName, email, phoneNumber, photoURL, providerId, uid } =
      userData.user;

    const user = {
      albums: [],
      comments: [],
      displayName,
      email,
      phoneNumber,
      photoURL,
      providerId,
      uid,
    };
    return setDoc(doc(collection(this.fs, 'users'), userData.user.uid), user);
  }

  registerUser(userData: User): Promise<UserCredential> {
    const { email, password } = userData;

    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginUser(userData: User): Promise<UserCredential> {
    const { email, password } = userData;

    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
