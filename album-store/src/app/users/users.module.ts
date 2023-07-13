import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
