import { Injectable, inject } from '@angular/core';
import { Auth,
         AuthProvider,
         GoogleAuthProvider,
         UserCredential,
         authState,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signInWithPopup,
         sendPasswordResetEmail,
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

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();

    return this.callPopUp(provider);
  }

  /*signInWithIosProvider(): Promise<UserCredential> {
    const provider = new AppleAuthProvider();

    return this.callPopUp(provider);
  }*/

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.login();
      return result;
    } catch (error: any) {
      return error;
    }
  }

  login() {
    this._isLoggedIn.next(true);
  }

  logout() {
    this._isLoggedIn.next(false);
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Password reset email sent successfully!');
    } catch (error) { 
      console.error('Error sending password reset email:', error);
    }
  }
}
