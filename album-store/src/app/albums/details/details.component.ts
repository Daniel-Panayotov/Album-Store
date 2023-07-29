import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of, takeUntil, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DocumentData } from '@angular/fire/firestore';
import { UserService } from 'src/app/users/user.service';
import { Album } from 'src/app/types/album';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject<void>();
  albumPopulated: DocumentData = [];
  isOwner: boolean = false;
  isLoading: boolean = true;

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
        await this.albumService.deleteAlbum(this.albumPopulated['id']);

        this.router.navigate(['/home']);
      } catch (err) {
        this.router.navigate(['/error']);
        console.log(err);
      }
    }
  }

  ngOnInit(): void {
    this.getAlbum();

    this.albumService.commentDel$$
      .pipe(
        switchMap((index) => {
          this.albumService.fixRefsInAlbum(this.albumPopulated);
          this.albumPopulated['commentList'].splice(index, 1);
          return from(this.albumService.deleteComment(this.albumPopulated));
        }),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          this.router.navigate(['/error']);

          console.log(err);

          return of([]);
        })
      )
      .subscribe();
  }

  getAlbum() {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.albumService.getOnePopulated(id)),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          this.router.navigate(['/error']);

          console.log(err);

          return of([]);
        })
      )
      .subscribe((album) => {
        this.albumPopulated = album;

        this.isOwner =
          this.user['user_id'] == this.albumPopulated['owner'] ? true : false;

        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  get areThereComments(): boolean {
    return !!this.albumPopulated['commentList'][0];
  }

  get user() {
    return this.userService.userData;
  }
}
