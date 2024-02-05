import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-b',
  standalone: true,
  imports: [],
  templateUrl: './navbar-b.component.html',
  styleUrl: './navbar-b.component.css'
})
export class NavbarBComponent {
  private _router = inject(Router);

  private authservice = inject(AuthService)

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.log(error)
    }
  }
}
