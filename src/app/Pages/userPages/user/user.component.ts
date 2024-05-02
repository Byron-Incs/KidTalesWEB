import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  private activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  user$!: Observable<User>;
  userId!: string;

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.userId! = this.activatedRoute.snapshot.params['id'];
    this.user$ = this.userService.getUser(id);
  }
}
