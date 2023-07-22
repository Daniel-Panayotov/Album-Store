import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { isLoggedActivate } from '../shared/guards/isLogged.activate';
import { ProfileComponent } from './profile/profile.component';
import { isNotLoggedActivate } from '../shared/guards/isNotLogged.activate';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [isNotLoggedActivate],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [isNotLoggedActivate],
    component: RegisterComponent,
  },
  {
    path: 'profile',
    canActivate: [isLoggedActivate],
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
