import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, of, switchMap, takeUntil } from 'rxjs';
import { CommentService } from '../comment.service';
import { Comment } from 'src/app/types/comment';
import { NgForm } from '@angular/forms';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css'],
})
export class EditCommentComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject();
  comment: Comment | undefined;
  album: DocumentData = [];
  albumId: string = '';
  index: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          const { id, index } = params;

          this.index = Number(index);
          this.albumId = id;

          return this.commentService.getComment(id, Number(index));
        }),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          console.log(err);

          return of([]);
        })
      )
      .subscribe(([comment, album]) => {
        this.comment = comment;
        this.album = album;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  editComment(form: NgForm) {
    const { comment } = form.value;

    if (comment == '') {
      return;
    }

    this.album['commentList'][this.index] = {
      comment,
      user: this.comment?.['user'],
    };

    this.commentService
      .editComment(this.album)
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe(() =>
        this.router.navigate([`/albums/${this.albumId}/details`])
      );
  }
}
