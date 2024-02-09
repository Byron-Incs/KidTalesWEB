import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarBComponent } from './Pages/commponents/navbar-b/navbar-b.component';
import { NavbarAComponent } from './Pages/commponents/navbar-a/navbar-a.component';
import { FooterAComponent } from './Pages/commponents/footer-a/footer-a.component';
import { FooterBComponent } from './Pages/commponents/footer-b/footer-b.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarAComponent, FooterAComponent, FooterBComponent, NavbarBComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'KidTalesWEB';

  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }
}
