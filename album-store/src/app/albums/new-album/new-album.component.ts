import { Component, ViewChild } from '@angular/core';
import { AlbumService } from '../album.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css'],
})
export class NewAlbumComponent {
  @ViewChild('albumForm') form: NgForm | undefined;
  constructor(private albumService: AlbumService, private router: Router) {}

  async createAlbum(): Promise<void> {
    const album = {
      albumName: '',
      band: '',
      commentList: [],
      image: '',
      ratingList: [],
      uid: '',
    };

    try {
      await this.albumService.createAlbum(album);

      this.router.navigate(['/home']);
    } catch (err) {
      console.log(err);
    }
  }
}
