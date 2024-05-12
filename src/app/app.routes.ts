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
import { PaymentDetailsComponent } from './Pages/userPages/payments/payment-details/payment-details.component';

import { UserComponent } from './Pages/userPages/user/user.component';

import { RouterModule, Routes } from '@angular/router';

import { authGuard, publicGuard } from './core/guards';
import { ActivatedPlanComponent } from './Pages/userPages/payments/activated-plan/activated-plan.component';

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
                path: 'user/:id',
                component: UserComponent
            },
            {
                path: 'atetionclient/:id',
                component: AtetionclientComponent
            },
            {
                path: 'configuration/:id',
                component: ConfigurationComponent
            },
        ]
    },
    {
        path: 'user/payment-details',
        canActivate: [authGuard],
        children: [
            {
                path: 'free/:id',
                component: PaymentDetailsComponent
            },
            {
                path: 'plan/:id',
                component: ActivatedPlanComponent,
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
  ],
  imports: [
    BrowserModule,
    ForgotpasswordComponent,
    RouterModule.forRoot(routes),
    JoinComponent,
    LoginComponent,
    UserComponent,
    AtetionclientComponent,
    PaymentDetailsComponent,
    ConfigurationComponent,
    ActivatedPlanComponent,
  ],
  providers: [],
  bootstrap: []
})

export class AppModule { }