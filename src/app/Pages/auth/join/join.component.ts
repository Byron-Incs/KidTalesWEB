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
import { error } from 'console';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface SignUpForm {
  email: FormControl<string>;
  nombre: FormControl<string>;
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
  ],
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.css',
  providers: [],
})

export class JoinComponent {
  hide = true;

  formBuilder = inject(FormBuilder);

  form: FormGroup<SignUpForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    nombre: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
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

  async signUp(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    }

    try {
      await this.authService.signUpWithEmailAndPassword(
        credential
      );
      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('user/user');
      });
    } catch (error) {
      console.error(error);
    }
  }

  openSnackBar() {
    return this._snackBar.open('Registrado con éxito 😀', 'Cerrar', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
