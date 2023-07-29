import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, switchMap, catchError, takeUntil, map, of } from 'rxjs';
import { AlbumService } from '../album.service';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css'],
})
export class EditAlbumComponent implements OnInit, OnDestroy {
  @ViewChild('albumForm') form: NgForm | undefined;
  unsubscribe$$: Subject<void> = new Subject<void>();
  urlRegex: RegExp = environment.url_regex;
  album: DocumentData = {
    band: 'Loading...',
    album: 'Loading...',
    image: 'Loading...',
  };

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async editAlbum(): Promise<void> {
    const { band, album, image } = this.form?.value;

    const { id, owner, ratingList, commentList } = this.album;

    const newAlbum = {
      band,
      image,
      album,
      id,
      owner,
      ratingList,
      commentList,
    };

    try {
      await this.albumService.updateAlbum(newAlbum);

      this.router.navigate([`/home`]);
    } catch (err) {
      this.router.navigate(['/error']);

      console.log(err);
    }
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.albumService.getOne(id)),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          this.router.navigate(['/error']);

          console.log(err);

          return of([]);
        })
      )
      .subscribe((album) => (this.album = album));
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
