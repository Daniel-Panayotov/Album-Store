import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { AlbumService } from 'src/app/albums/album.service';
import { Album } from 'src/app/types/album';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  albums: DocumentData[] = [];
  unsubscribe = () => {};

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    const subscription = this.albumService.getAll().subscribe(
      (albums) => {
        this.albums = albums;
      },
      (err) => console.log(err)
    );

    this.unsubscribe = subscription.unsubscribe;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
