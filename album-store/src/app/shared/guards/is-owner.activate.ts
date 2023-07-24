import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
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
    const id = route.params['id'];

    return true;
  }
}
