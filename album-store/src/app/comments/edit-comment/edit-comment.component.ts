import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, of, switchMap, takeUntil } from 'rxjs';
import { CommentService } from '../comment.service';
import { Comment } from 'src/app/types/comment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css'],
})
export class EditCommentComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject();
  comment: Comment | undefined;
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
      .subscribe((comment) => {
        this.comment = comment;
        console.log(comment);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  editComment(form: NgForm) {
    const comment = form.value['comment'] as string;
    const { user } = this.comment as Comment;

    if (comment == '') {
      return;
    }

    const newComment = {
      comment,
      user,
    };

    this.commentService
      .editComment(newComment, this.albumId, this.index)
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe();
  }
}
