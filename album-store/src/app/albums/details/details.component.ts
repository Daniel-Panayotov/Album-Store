import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of, takeUntil } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DocumentData } from '@angular/fire/firestore';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject<void>();
  album: DocumentData = [];
  isOwner: boolean = false;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  async deleteAlbum(): Promise<void> {
    const isSure = window.confirm('Would you like to proceed with deletion?');

    if (isSure) {
      try {
        await this.albumService.deleteAlbum(this.album['id']);

        this.router.navigate(['/home']);
      } catch (err) {
        console.log(err);
      }
    }
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.albumService.getOnePopulated(id)),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          console.log(err);

          return of([]);
        })
      )
      .subscribe((album) => {
        this.album = album;

        this.isOwner =
          this.userService.userData['user_id'] == this.album['owner']
            ? true
            : false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  get user() {
    return this.userService.userData;
  }
}
