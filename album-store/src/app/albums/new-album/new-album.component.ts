import { Component, ViewChild } from '@angular/core';
import { AlbumService } from '../album.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css'],
})
export class NewAlbumComponent {
  @ViewChild('albumForm') form: NgForm | undefined;

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private userService: UserService
  ) {}

  async createAlbum(): Promise<void> {
    const { band, album, image } = this.form?.value;

    const owner: string = this.userService.userData?.['user_id'];

    try {
      const newAlbum = {
        album,
        band,
        commentList: [],
        image,
        ratingList: [],
        owner,
      };

      await this.albumService.createAlbum(newAlbum);

      this.router.navigate(['/home']);
    } catch (err) {
      console.log(err);
    }
  }
}
