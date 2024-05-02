import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.interface';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {
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
