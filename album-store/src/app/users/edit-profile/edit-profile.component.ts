import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subject, catchError, of, switchMap, takeUntil } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  urlRegex: RegExp = environment.url_regex;
  unsubscribe$$: Subject<void> = new Subject();
  user: DocumentData = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
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

  editProfile(form: NgForm) {
    const { username, image } = form.value;

    if (!this.urlRegex.exec(image) || username.length < 4) {
      return;
    }

    this.user['displayName'] = username;
    this.user['photoURL'] = image;

    this.userService
      .updateUserProfile(username, image)
      .pipe(
        switchMap(() => this.userService.updateUserDbEntry(this.user)),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          console.log(err);

          return of([]);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/users/profile']);
      });
  }
}
