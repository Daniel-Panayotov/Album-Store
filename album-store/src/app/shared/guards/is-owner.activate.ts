import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { AlbumService } from 'src/app/albums/album.service';
import { UserService } from 'src/app/users/user.service';

@Injectable({ providedIn: 'root' })
export class isOwnerActivate implements CanActivate {
  constructor(
    private userService: UserService,
    private albumService: AlbumService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const user = this.userService.userData;
    const albumId = route.params['id'];

    return this.albumService.getOne(albumId).pipe(
      map((album) => {
        if (album['owner'] == user?.['user_id']) {
          return true;
        }

        this.router.navigate(['/home']);
        return false;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }
}
