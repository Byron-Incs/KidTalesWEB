import { NgOptimizedImage } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../core/models/user.interface';
import { UserRegistrationService } from '../../../../core/services/userRegistration.service';
import { AuthService } from '../../../../core/services/auth.service';


export type Provider = 'google';

@Component({
   standalone: true,
   imports: [NgOptimizedImage],
   selector: 'app-button-providers',
   templateUrl: './button-providers.component.html',
   styleUrls: ['./button-providers.component.scss'],
})

export class ButtonProviders {
  defaultUser: User = {
    adventure_stories_history: [],
    email: '',
    fantasy_stories_history: [],
    horror_stories_history: [],
    language: 'español',
    parentalPassword: '',
    phoneNum: null,
    plan: false,
    romance_stories_history: [],
    timeLimit: 0,
    username: '',
  };
  
  @Input() isLogin = false;
  
  private _userRegistrationService = inject(UserRegistrationService);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  
  providerAction(provider: Provider): void {
    if (provider === 'google') {
      this.signUpWithGoogle();
    } else {
      //
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      const result = await this._authService.signInWithGoogleProvider();
      const user = result.user;

      if (user) {
        const uid = user.uid;

        const existingUser = await this._userRegistrationService.checkUserExists(uid);

        if (!existingUser) {
          const newUser: User = {
            ...this.defaultUser,
            email: user.email || '',
            username: user.displayName || '',
          };
          await this._userRegistrationService.registerUserWithGoogle(newUser, uid);
        } else {

          console.log('User already exists:', existingUser);
          this._router.navigateByUrl('user/user/' + user.uid);
        }
      }

      this._router.navigateByUrl('user/user/' + user.uid);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }
}