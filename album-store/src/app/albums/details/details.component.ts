import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, of, takeUntil } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  unsubscribe$$: Subject<void> = new Subject<void>();

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.albumService.getOnePopulated(id)),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          console.log(err);

          return of(err);
        })
      )
      .subscribe((album) => console.log(album));
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
