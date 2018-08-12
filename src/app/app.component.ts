import { Component, HostBinding } from '@angular/core';

import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

import { Token } from './shared/interfaces';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @HostBinding('class') componentCssClass;
  isChecked = false;
  turnText = 'Turn On';
  token: Token = null;
  authUserSubscription: Subscription;

  constructor ( public authService: AuthService, 
                private overlayContainer: OverlayContainer ) {
    if (localStorage.getItem('bagda_light') !== 'on') {
      this.overlayContainer.getContainerElement().classList.add('bagda-dark-theme');
      this.componentCssClass = 'bagda-dark-theme';
    } else {
      this.isChecked = true;
      this.turnText = 'Turn Off'
    }
  }

  ngOnInit(): void {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: Token) => this.token = token);
  }

  changeTheme(checked: boolean) {
    if (checked) {
      localStorage.setItem('bagda_light', 'on');
      this.turnText = 'Turn Off'
      this.overlayContainer.getContainerElement().classList.remove('bagda-dark-theme');
      this.componentCssClass = '';
    } else {
      localStorage.setItem('bagda_light', 'off');
      this.turnText = 'Turn On'
      this.overlayContainer.getContainerElement().classList.add('bagda-dark-theme');
      this.componentCssClass = 'bagda-dark-theme';
    }
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
  }

}
