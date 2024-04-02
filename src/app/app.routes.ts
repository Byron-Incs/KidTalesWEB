import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './Pages/homePages/home/home.component';
import { AboutComponent } from './Pages/homePages/about/about.component';
import { ForgotpasswordComponent } from './Pages/auth/forgotpassword/forgotpassword.component';
import { JoinComponent } from './Pages/auth/join/join.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { PagenotfoundComponent } from './Pages/commponents/pagenotfound/pagenotfound.component';
import { SupportComponent } from './Pages/homePages/support/support.component';
import { AtetionclientComponent } from './Pages/userPages/atetionclient/atetionclient.component';
import { ConfigurationComponent } from './Pages/userPages/configuration/configuration.component';
import { PaymentDetailsComponent } from './Pages/userPages/payment-details/payment-details.component';
import { SubUserComponent } from './Pages/userPages/sub-user/sub-user.component';
import { UserComponent } from './Pages/userPages/user/user.component';

import { RouterModule, Routes } from '@angular/router';

import { authGuard, publicGuard } from './core/guards';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        canActivate: [publicGuard],
        component: HomeComponent
    },
    {
        path: 'about',
        canActivate: [publicGuard],
        component: AboutComponent
    },
    {
        path: 'support',
        canActivate: [publicGuard],
        component: SupportComponent
    },
    {
        path: 'auth',
        canActivate: [publicGuard],
        children: [
            {
                path: 'join',
                component: JoinComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'forgotpassword',
                component: ForgotpasswordComponent
            },
        ]
    },
    {
        path: 'user',
        canActivate: [authGuard],
        children: [
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'atetionclient',
                component: AtetionclientComponent
            },
            {
                path: 'configuration',
                component: ConfigurationComponent
            },
            {
                path: 'payment-details',
                component: PaymentDetailsComponent
            },
            {
                path: 'sub-user',
                component: SubUserComponent
            },
        ]
    },
    {
        path: '**',
        component: PagenotfoundComponent
    },
    
]

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PagenotfoundComponent,
    SupportComponent,
    AtetionclientComponent,
    ConfigurationComponent,
    PaymentDetailsComponent,
    SubUserComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    ForgotpasswordComponent,
    RouterModule.forRoot(routes),
    JoinComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: []
})

export class AppModule { }