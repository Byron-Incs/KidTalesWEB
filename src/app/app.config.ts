import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByRMv40h5tVDQkI5vwtQLT1DfWWvCnOAc",
  authDomain: "kid-tales1.firebaseapp.com",
  projectId: "kid-tales1",
  storageBucket: "kid-tales1.appspot.com",
  messagingSenderId: "539360258544",
  appId: "1:539360258544:web:573fbcc8bca47dd32a1535",
  measurementId: "G-76C435K39W"
};

initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),    
  importProvidersFrom(
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ) ]
};