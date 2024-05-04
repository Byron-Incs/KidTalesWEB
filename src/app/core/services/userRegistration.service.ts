import { Injectable, inject } from '@angular/core';
import { Firestore, collection, setDoc } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  private firestore = inject(Firestore);
  private userCollection = collection(this.firestore, 'users');
  private userService = inject(UserService);

  async registerUserWithGoogle(user: User, uid: string): Promise<void> {
    await this.userService.addUser(user, uid);
    console.log('User registered with Google:', user);
  }
}