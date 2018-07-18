import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { RpgService } from '../rpg.service';

@Injectable()
export class RpgResolverGuard implements Resolve<any> {

  constructor(
    private rpgService: RpgService,
  ) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    
      return this.rpgService.rpg(next.params['id']);
  }
}
