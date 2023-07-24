import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AlbumCardComponent } from './album-card/album-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoaderComponent, AlbumCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [LoaderComponent, AlbumCardComponent],
})
export class SharedModule {}
