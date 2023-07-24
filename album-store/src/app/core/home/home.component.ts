import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { AlbumService } from 'src/app/albums/album.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  albums: DocumentData[] = [];
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService
      .getAll()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (albums: DocumentData[]) => {
          this.albums = albums;
        },
        (err) => console.log(err)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
