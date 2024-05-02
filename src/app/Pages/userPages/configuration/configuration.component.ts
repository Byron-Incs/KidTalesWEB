import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/models/user.interface';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  private readonly userService = inject(UserService);
  private activatedRoute = inject( ActivatedRoute);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  userId!: string;
  prevTimeLimit = 0;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userId = id;
    this.userService.getUser(id).subscribe(user => this.userSubject.next(user));
  }

  deleteUser() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.deleteUser(id);
  }
}
