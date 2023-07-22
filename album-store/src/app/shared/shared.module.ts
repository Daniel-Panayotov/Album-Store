import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AlbumCardComponent } from './album-card/album-card.component';

@NgModule({
  declarations: [LoaderComponent, AlbumCardComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, AlbumCardComponent],
})
export class SharedModule {}
