import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/services/auth.service';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ButtonProviders } from '../components/button-providers/button-providers.component';

interface ForgotForm {
  email: FormControl<string>;
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
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [],
})
export class ForgotpasswordComponent {

  formBuilder = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  private _snackBar = inject(MatSnackBar);

  form: FormGroup<ForgotForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'Este campo es requerido'
        : 'Ingresa un email válido';
    }

    return false;
  }

  async onResetPassword(): Promise<void> {
    if (this.form.invalid) return;

    const email = this.form.value.email;

    try {
      await this.authService.resetPassword(email);
      this.openSnackBar('¡Se ha enviado un correo electrónico para restablecer su contraseña!');
      this.router.navigateByUrl('/auth/login');
    } catch (error) {
      console.error(error);
      this.openSnackBar('Error al restablecer la contraseña. Intente nuevamente.');
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}