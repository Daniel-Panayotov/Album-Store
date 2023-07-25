import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/albums/album.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private albumService: AlbumService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  findAlbums(form: NgForm) {
    const { search } = form.value;

    const url = this.router.routerState.snapshot.url;

    if (url != '/home') {
      this.router.navigate(['/home']);
    }

    this.albumService.homeAlbums$$.next(search);
  }

  get isLoggedIn(): boolean {
    return !!this.userService.userToken;
  }

  async logout() {
    try {
      await this.userService.logout();
    } catch (err) {
      console.log(err);
    }
  }
}
