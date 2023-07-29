import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { AlbumService } from 'src/app/albums/album.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject();
  user: DocumentData = [];

  constructor(
    private userService: UserService,
    private albumService: AlbumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          this.router.navigate(['/error']);

          console.log(err);
          return of([]);
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

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
      this.router.navigate(['/home']);
    } catch (err) {
      this.router.navigate(['/error']);

      console.log(err);
    }
  }
}
