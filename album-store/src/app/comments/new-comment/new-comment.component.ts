import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { CommentService } from '../comment.service';
import { AlbumService } from 'src/app/albums/album.service';
import { DocumentData } from '@angular/fire/firestore';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
})
export class NewCommentComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject<void>();
  albumId: string = '';
  album: DocumentData = [];

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.albumId = params['id'];
          return this.albumService.getOne(params['id']);
        }),
        map((album) => {
          this.album = album;
        }),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          this.router.navigate(['/error']);

          console.log(err);

          return of([]);
        })
      )
      .subscribe((user) => {});
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  addComment(form: NgForm): void {
    const { comment } = form.value;

    if (comment == '') {
      return;
    }

    this.commentService
      .commentOnAlbum(this.album, comment)
      .pipe(
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          this.router.navigate(['/error']);

          console.log(err);

          return of([]);
        })
      )
      .subscribe(() =>
        this.router.navigate([`/albums/${this.albumId}/details`])
      );
  }
}
