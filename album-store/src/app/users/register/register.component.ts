import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('registerForm') form: NgForm | undefined;
  isBtnDisabled = false;
  isEmailInvalid = false;

  constructor(private userService: UserService, private router: Router) {}

  ngAfterViewInit(): void {}

  async register() {
    const { email, password, rePassword } = this.form?.value;

    this.isEmailInvalid = false;

    if (password != rePassword) {
      return;
    }

    try {
      const userData = await this.userService.registerUser({ email, password });

      await this.userService.createUserDbEntry(userData);

      this.router.navigate(['/home']);
    } catch (err: any) {
      if (err.message.includes('email')) {
        this.isEmailInvalid = true;
      }
      console.log(err);
    }
  }
}
