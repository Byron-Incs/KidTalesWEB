import { Injectable, inject } from '@angular/core';
import { Auth,
          UserCredential,
          authState,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword
        } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private auth: Auth = inject(Auth);
  private readonly _isLoggedIn = new BehaviorSubject<boolean>(false);

  readonly authState$ = authState(this.auth);
  readonly isLoggedIn$ = this._isLoggedIn.asObservable();

  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
      );
  }

  logInWithEmailAndPassword(credential: Credential){
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    ) .then(() => this.login());
  }

  logOut(): Promise<void>{
    return this.auth.signOut().then(() => this.logout());
  }

  login() {
    this._isLoggedIn.next(true);
  }

  logout() {
    this._isLoggedIn.next(false);
  }
}
