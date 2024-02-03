import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar-b',
  standalone: true,
  imports: [],
  templateUrl: './navbar-b.component.html',
  styleUrl: './navbar-b.component.css'
})
export class NavbarBComponent {

  private authservice = inject(AuthService)

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
    } catch (error) {
      console.log(error)
    }
  }
}
