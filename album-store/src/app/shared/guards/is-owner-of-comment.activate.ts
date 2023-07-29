import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
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
export class isOwnerOfCommentActivate implements CanActivate {
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
    const { id, index } = route.params;

    return this.albumService.getOne(id).pipe(
      map((album: DocumentData) => {
        const comment = album['commentList'][Number(index)];

        if (user?.['user_id'] == comment.user['id']) {
          return true;
        }
        this.router.navigate(['/unauthorised']);
        return false;
      }),
      catchError((err) => {
        console.log(err);
        this.router.navigate(['/error']);

        return of(false);
      })
    );
  }
}
