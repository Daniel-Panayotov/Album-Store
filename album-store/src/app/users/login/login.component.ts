import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginForm') form: NgForm | undefined;
  emailRegex: RegExp = environment.email_regex;

  constructor(private userService: UserService, private router: Router) {}

  ngAfterViewInit(): void {}

  async login() {
    const { email, password } = this.form?.value;

    if (!this.emailRegex.exec(email) || password.length < 6) {
      return;
    }

    try {
      await this.userService.loginUser({ email, password });

      await this.userService.refreshToken();

      this.router.navigate(['/home']);
    } catch (err) {
      this.router.navigate(['/error']);

      console.log(err);
    }
  }
}
