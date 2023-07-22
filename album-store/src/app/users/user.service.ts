import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { User } from '../types/user';
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
    this.setAuthObservable();
    this.isTokenExpired();
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

  refreshToken(): Promise<string> | undefined {
    return this.auth.currentUser?.getIdToken(true);
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
      boughtAlbums: [],
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
