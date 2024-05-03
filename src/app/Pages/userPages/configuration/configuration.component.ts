import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonProviders } from '../../auth/components/button-providers/button-providers.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface ConfigForm {
  timeLimit: FormControl<number>;
  language: FormControl<string>;
}

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ButtonProviders,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent {

  formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  userId!: string;

  timeLimitConfig = {
    validators: Validators.required,
  };

  form: FormGroup<ConfigForm> = this.formBuilder.group({
    timeLimit: this.formBuilder.control(0, { validators: Validators.required }),
    language: new FormControl(''),
  });

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userId = id;
    this.userService
    .getUser(id)
    .subscribe(user => this.userSubject.next(user));
    
    this.userService
    .getUser(this.userId)
    .subscribe((data) => this.form.patchValue(data));
  }

  deleteUser() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.deleteUser(id);
  }

  updateUser(){
    this.userService
    .updateUser(this.form.value as User, this.userId);
  }
}