import { FirebaseService } from 'src/app/shared/firebase.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private firebase$: FirebaseService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.firebase$.isCreatedClient) {
      return true;
    }
    if (this.firebase$.isLogin) {
      return true;
    }
    this.router.navigate([''])
    return false;
  }
}
