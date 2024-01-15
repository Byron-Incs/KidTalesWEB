import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SupportComponent } from './support/support.component';
import { AtetionclientComponent } from './atetionclient/atetionclient.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { SubUserComponent } from './sub-user/sub-user.component';
import { UserComponent } from './user/user.component';

import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'forgotpassword',
        component: ForgotpasswordComponent
    },
    {
        path: 'join',
        component: JoinComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'support',
        component: SupportComponent
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
    {
        path: 'user',
        component: UserComponent
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
    ForgotpasswordComponent,
    JoinComponent,
    LoginComponent,
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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: []
})

export class AppModule { }