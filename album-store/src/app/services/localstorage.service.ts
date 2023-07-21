import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(environment.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(environment.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(environment.TOKEN_KEY);
  }
}
