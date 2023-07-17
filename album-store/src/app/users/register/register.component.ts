import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('registerForm') form: NgForm | undefined;
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

  async register() {
    const { email, password, rePassword } = this.form?.value;

    if (password != rePassword) {
      return;
    }

    let user = { email, password };

    try {
      const data = await this.userService.registerUser(user);
    } catch (err) {
      console.log(err);
    }
  }
}
