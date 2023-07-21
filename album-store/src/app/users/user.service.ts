import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  query,
  where,
  setDoc,
  addDoc,
} from '@angular/fire/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  signInWithCredential,
} from '@angular/fire/auth';
import { User } from '../types/user';
import { environment } from 'src/environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalstorageService } from '../services/localstorage.service';

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
    this.isTokenExpired();
    this.setAuthObservable();
  }

  isTokenExpired() {
    if (this.jwtHelper.isTokenExpired(this.userToken)) {
      this.LsService.clearToken();
      this.userToken = this.LsService.getToken();
    }
  }

  setAuthObservable(): void {
    this.auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          try {
            const jwt = await user.getIdToken();

            this.LsService.setToken(jwt);
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

  createUserDbEntry(userData: UserCredential): Promise<void> {
    const {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      phoneNumber,
      photoURL,
      providerData,
      providerId,
      tenantId,
      uid,
      refreshToken,
    } = userData.user;

    const user = {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      phoneNumber,
      photoURL,
      providerData,
      providerId,
      tenantId,
      uid,
      refreshToken,
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
