import { Component, ViewChild, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { DocumentReference } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.development';
import { Subject, catchError, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css'],
})
export class NewAlbumComponent implements OnDestroy {
  @ViewChild('albumForm') form: NgForm | undefined;
  urlRegex: RegExp = environment.url_regex;
  unsubscribe$$: Subject<void> = new Subject();

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  async createAlbum(): Promise<void> {
    const { band, album, image } = this.form?.value;

    const owner: string = this.userService.userData?.['user_id'];

    const newAlbum = {
      album,
      band,
      commentList: [],
      image,
      ratingList: [],
      owner,
      id: '',
    };

    this.albumService
      .createAlbum(newAlbum)
      .pipe(
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          console.log(err);

          return of([]);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
