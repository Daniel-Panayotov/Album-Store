import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/secretEnvironment';
import * as buildEnv from 'src/environments/environment.development';
import { TokenInterceptorProvider } from './shared/interceptors/token.interceptor';
import { AlbumsModule } from './albums/albums.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AlbumsModule,
    BrowserModule,
    CoreModule,
    UsersModule,
    SharedModule,
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
