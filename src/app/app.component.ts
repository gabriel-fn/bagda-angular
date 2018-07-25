import { Component } from '@angular/core';

import { Subscription } from 'rxjs';

import { Token } from './shared/interfaces';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isCollapsed: boolean = true;
  token: Token = null;
  authUserSubscription: Subscription;

  constructor (public authService: AuthService) { }

  ngOnInit(): void {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: Token) => this.token = token);
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
  }

}
