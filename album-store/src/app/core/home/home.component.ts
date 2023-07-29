import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { AlbumService } from 'src/app/albums/album.service';
import { Subject, switchMap, takeUntil, catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  albums: DocumentData[] = [];
  unsubscribe$$: Subject<void> = new Subject<void>();

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.homeAlbums$$
      .pipe(
        switchMap((search) => this.albumService.getAll(search)),
        takeUntil(this.unsubscribe$$),
        catchError((err) => {
          console.log(err);

          return of([]);
        })
      )
      .subscribe((albums: DocumentData[]) => {
        this.albums.push(...albums);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
