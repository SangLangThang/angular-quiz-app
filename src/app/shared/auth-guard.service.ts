import { FirebaseService } from 'src/app/shared/firebase.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getCookie } from './cookie';
import { IS_LOGGED } from './consts';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private firebase$: FirebaseService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(getCookie(IS_LOGGED) || this.firebase$.isCreatedClient || this.firebase$.isLogin) {
      return true;
    }
    this.router.navigate([''])
    return false;
  }
}
