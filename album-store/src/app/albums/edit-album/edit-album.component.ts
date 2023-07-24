import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, switchMap, catchError, takeUntil, map, of } from 'rxjs';
import { AlbumService } from '../album.service';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css'],
})
export class EditAlbumComponent implements OnInit, OnDestroy {
  @ViewChild('albumForm') form: NgForm | undefined;
  unsubscribe: Subject<void> = new Subject<void>();
  album: DocumentData = [];

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}

  editAlbum() {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.albumService.getOne(id)),
        takeUntil(this.unsubscribe),
        catchError((err) => {
          console.log(err);

          return of([]);
        })
      )
      .subscribe((album) => (this.album = album));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
