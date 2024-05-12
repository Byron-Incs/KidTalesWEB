import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../../../core/models/user.interface';
import { AsyncPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonProviders } from '../../auth/components/button-providers/button-providers.component';

interface UserForm {
  username: FormControl<string>;
  phoneNum: FormControl<string>;
}

@Component({
  selector: 'app-user',
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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  private snackBar = inject(MatSnackBar);

  formBuilder = inject(FormBuilder);

  private activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  user$!: Observable<User>;
  userId!: string;
  originalPlan!: boolean;
  hasPlan!: boolean;

  form: FormGroup<UserForm> = this.formBuilder.group({
    username: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    phoneNum: new FormControl(''),
  });

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];

    this.userId! = this.activatedRoute.snapshot.params['id'];
    this.user$ = this.userService.getUser(id).pipe(
      tap((data) => {
        this.form.patchValue(data);
        this.originalPlan = data.plan;
        this.hasPlan = this.originalPlan;
      })
    );
  }

  updateUser() {
    if (this.form.valid) {
      this.userService.updateUser(this.form.value as User, this.userId)
        .then(() => {
          this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', {
            duration: 2500,
          });
        })
        .catch((error) => {
          this.snackBar.open('Error al actualizar usuario', 'Cerrar', {
            duration: 2500,
          });
        });
    } else {
      this.snackBar.open('Los datos son inválidos', 'Cerrar', {
        duration: 2500,
      });
    }
  }
}
