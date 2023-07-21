import { Component } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private userService: UserService) {}

  get isLoggedIn(): boolean {
    return !!this.userService.userToken;
  }

  // toggle(): void {
  //   this.userService.isLoggedIn = !this.userService.isLoggedIn;
  // }

  async logout() {
    try {
      await this.userService.logout();
    } catch (err) {
      console.log(err);
    }
  }
}
