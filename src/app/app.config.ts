import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp({
        apiKey: "AIzaSyByRMv40h5tVDQkI5vwtQLT1DfWWvCnOAc",
        authDomain: "kid-tales1.firebaseapp.com",
        projectId: "kid-tales1",
        storageBucket: "kid-tales1.appspot.com",
        messagingSenderId: "539360258544",
        appId: "1:539360258544:web:573fbcc8bca47dd32a1535",
        measurementId: "G-76C435K39W"
      })),
      provideFirestore(() => getFirestore()),
    ])
  ]
};
