import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private firestore = inject(Firestore);
  private userCollection = collection(this.firestore, 'users');

  async addUser(user: User, uid: string) {
    const userRef = doc(this.userCollection, uid);
    await setDoc(userRef, user);
  }
}
