import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { UserService } from '../user.service';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject();
  user: DocumentData = [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

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
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
