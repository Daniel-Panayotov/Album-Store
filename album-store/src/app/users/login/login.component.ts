import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginForm') form: NgForm | undefined;
  isBtnDisabled = false;

  constructor(private userService: UserService, private router: Router) {}

  ngAfterViewInit(): void {}

  async login() {
    const { email, password } = this.form?.value;

    try {
      const user = await this.userService.loginUser({ email, password });
      const token = user._tokenResponse;
      document.cookie = JSON.stringify(token);

      this.router.navigate(['/home']);
    } catch (err) {
      console.log(err);
    }
  }
}
