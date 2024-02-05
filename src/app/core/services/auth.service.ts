import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth) {
    // Suscripción a authState$ para actualizar _isLoggedIn
    this.authState$.subscribe((user) => {
      this._isLoggedIn.next(!!user);
    });
  }

  readonly authState$ = authState(this.auth);
  readonly isLoggedIn$ = this._isLoggedIn.asObservable();

  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, credential.email, credential.password);
  }

  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(this.auth, credential.email, credential.password);
  }

  logOut(): Promise<void> {
    return signOut(this.auth);
  }
}