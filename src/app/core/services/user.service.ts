import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import { Observable, from, map } from 'rxjs';
import { deleteDoc, getDoc } from 'firebase/firestore';

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

  getUser(id: string){
    return from(getDoc(doc(this.firestore, 'users', id))).pipe(
      map(spanshot => spanshot.data() as User)
    );
  }

  deleteUser(id: string){
    const docrRef = doc(this.firestore, 'users', id);
    deleteDoc(docrRef);
  }
}
