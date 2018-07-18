import { Component } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isCollapsed: boolean = true;
  isLoggedIn: any = null;

  constructor (public authService: AuthService) {
    this.authService.authUser = new BehaviorSubject(null);
    this.authService.seeAuthUser = this.authService.authUser.asObservable();
    this.authService.seeAuthUser.subscribe(
      (token) => {
        this.isLoggedIn = token;
      }
    );
  }

  logout() {
    this.authService.logout();
  }

}
