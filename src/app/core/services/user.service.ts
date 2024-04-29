import { Injectable, inject } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import { addDoc } from 'firebase/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore = inject(Firestore);
  private userCollection = collection(this.firestore, 'users');

  addUser(user: User){
    return of(addDoc(this.userCollection, user));
  }
}
