import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { getAuth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PagenotfoundComponent {
  private _router = inject(Router);

  private authservice = inject(AuthService)

  logOut() {
    const auth = getAuth();
    signOut(auth).then(() => this._router.navigateByUrl('/'));
  }

}
