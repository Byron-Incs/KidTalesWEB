import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService, Credential } from '../../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ButtonProviders } from '../components/button-providers/button-providers.component';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.interface';

interface SignUpForm {
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ButtonProviders,
  ],
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.css',
  providers: [],
})

export class JoinComponent {

  defaultUser: User = {
    adventure_stories_history: [],
    email: '',
    fantasy_stories_history: [],
    horror_stories_history: [],
    language: 'español',
    parentalPassword: "",
    phoneNum: null,
    plan: false,
    romance_stories_history: [],
    timeLimit: 0,
    username: '',
  };

  hide = true;

  formBuilder = inject(FormBuilder);

  private readonly userService = inject(UserService);

  form: FormGroup<SignUpForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    username: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(7)],
      nonNullable: true,
    }),
  });

  private authService = inject(AuthService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'Este campo es requerido'
        : 'Ingresa un correo válido';
    }

    return false;
  }

  get passwordErrorMessage(): string | boolean {
    const control = this.form.get('password');
  
    if (control?.invalid && control.touched) {
      if (control.hasError('required')) {
        return 'Este campo es obligatorio';
      } else if (control.hasError('minlength')) {
        return 'La contraseña debe tener al menos 7 caracteres';
      }
    }
  
    return false;
  }

  async signUp(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    try {
      await this.authService.signUpWithEmailAndPassword(credential);
      await this.authService.login();

      this.saveDeck();

      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('user/user');
      });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        this._snackBar
        .open('El correo electrónico ya está registrado.', 'Cerrar', {
          duration: 2500,
        });
      } else {
        console.error(error);
      }
    }
  }

  openSnackBar() {
    return this._snackBar
    .open('Registrado con éxito 😀', 'Cerrar', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  saveDeck() {
    const userToSave: User = {
      ...this.defaultUser,
      email: this.form.value.email,
      username: this.form.value.username,
    } as User;
    
    this.userService.addUser(userToSave)
    .subscribe((res => console.log));
  }
}