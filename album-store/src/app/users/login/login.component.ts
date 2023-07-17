import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginForm') form: NgForm | undefined;
  isBtnDisabled = false;

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.form?.statusChanges?.subscribe((status) => {
      if (status == 'INVALID') {
        this.isBtnDisabled = true;
      } else {
        this.isBtnDisabled = false;
      }
    });
  }

  login(): void {
    const { email, password } = this.form?.value;

    try {
      this.userService.loginUser({ email, password });
    } catch (err) {
      console.log(err);
    }
  }
}
