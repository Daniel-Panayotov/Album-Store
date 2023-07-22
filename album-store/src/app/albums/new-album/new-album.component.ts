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
    const { band, album, image } = this.form?.value;

    try {
      const newAlbum = {
        album,
        band,
        commentList: [],
        image,
        ratingList: [],
        uid: '',
      };

      await this.albumService.createAlbum(newAlbum);

      this.router.navigate(['/home']);
    } catch (err) {
      console.log(err);
    }
  }
}
