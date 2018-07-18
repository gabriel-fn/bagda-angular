import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable()
export class RpgGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let id = route.params['id'];
    if (id && id > 0) {
      return true;
    } else {
      this.router.navigate(['rpgs']);
      return false;
    }
  }
}
