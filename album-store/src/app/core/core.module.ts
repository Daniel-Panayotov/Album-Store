import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [{ path: 'home', component: HomeComponent }];

@NgModule({
  declarations: [
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {}
