import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/secretEnvironment';
import * as buildEnv from 'src/environments/environment.development';
import { AlbumsModule } from './albums/albums.module';
import { CommentsModule } from './comments/comments.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AlbumsModule,
    BrowserModule,
    CoreModule,
    UsersModule,
    SharedModule,
    CommentsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(buildEnv.environment.TOKEN_KEY),
      },
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
