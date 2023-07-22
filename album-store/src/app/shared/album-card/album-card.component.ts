import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css'],
})
export class AlbumCardComponent {
  @Input() album: DocumentData | undefined;

  get band() {
    return this.album?.['band'];
  }

  get albumName() {
    return this.album?.['album'];
  }

  get image() {
    return this.album?.['image'];
  }
}
