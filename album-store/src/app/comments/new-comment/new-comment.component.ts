import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
})
export class NewCommentComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject<void>();
  albumId: string = '';

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          this.albumId = params['id'];
        }),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          console.log(err);

          return of([]);
        })
      )
      .subscribe();
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
      .commentOnAlbum(this.albumId, comment)
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((album) => {
        // this.router.navigate([`albums/${this.albumId}/details`]);
      });
  }
}
