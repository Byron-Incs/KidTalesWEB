import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarBComponent } from './navbar-b/navbar-b.component';
import { NavbarAComponent } from './navbar-a/navbar-a.component';
import { FooterAComponent } from './footer-a/footer-a.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarAComponent, FooterAComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KidTalesWEB';
}
