import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-b',
  standalone: true,
  imports: [],
  templateUrl: './navbar-b.component.html',
  styleUrl: './navbar-b.component.css'
})
export class NavbarBComponent {
  logOut(): void {
    console.log('La función se ha ejecutado');
  }
}
