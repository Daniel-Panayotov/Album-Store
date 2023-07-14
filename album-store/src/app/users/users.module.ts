import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { isLoggedActivate } from '../shared/guards/isLogged.activate';

const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'profile',
        canActivate: [isLoggedActivate],
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
