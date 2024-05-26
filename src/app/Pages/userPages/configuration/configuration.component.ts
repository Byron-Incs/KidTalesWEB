import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonProviders } from '../../auth/components/button-providers/button-providers.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface ConfigForm {
  timeLimit: FormControl<number>;
  language: FormControl<string>;
  readingSpeed: FormControl<number>;
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

  private snackBar = inject(MatSnackBar);

  formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  userId!: string;
  originalPlan!: boolean;
  hasPlan!: boolean;

  timeLimitConfig = {
    validators: [Validators.required, this.validatePositiveInteger],
  };

  readingSpeed = {
    validators: [Validators.required, this.validatePositiveInteger],
  };

  form: FormGroup<ConfigForm> = this.formBuilder.group({
    timeLimit: this.formBuilder.control(0, this.timeLimitConfig),
    language: new FormControl(''),
    readingSpeed: this.formBuilder.control(0, this.readingSpeed),
  });

  validatePositiveInteger(control: FormControl) {
    const value = control.value;
    if (value === null || value === undefined) {
      return null;
    }
  
    if (value <= -1) {
      return { nonPositive: true };
    }
  
    if (!Number.isInteger(value)) {
      return { notInteger: true };
    }
  
    return null;
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userId = id;
    this.userService
    .getUser(id)
    .subscribe(user => this.userSubject.next(user));
    
    this.user$ = this.userService.getUser(id).pipe(
      tap((data) => {
        this.form.patchValue(data);
        this.originalPlan = data.plan;
        this.hasPlan = this.originalPlan;
      })
    );
  }

  deleteUser() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.deleteUser(id);
  }

  updateUser() {
    if (this.form.invalid) {
      this.snackBar.open('Los datos son inválidos', 'Cerrar', {
        duration: 2500,
      });
      return;
    }
  
    const updatedUser = this.form.value as User;
  
    this.userService.updateUser(updatedUser, this.userId)
      .then(() => {
        this.snackBar.open('Cambios guardados correctamente.', 'Cerrar', {
          duration: 2500,
        });
      })
      .catch((error) => {
        console.error('Error al actualizar usuario:', error);
        this.snackBar.open('No se pudieron guardar los cambios.', 'Cerrar', {
          duration: 2500,
        });
      });
  }
}