import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Rpg, Token } from '../../shared/interfaces';
import { RpgService } from '../rpg.service';
import { AuthService } from '../../auth/auth.service';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'app-rpg-painel',
  templateUrl: './rpg-painel.component.html',
  styleUrls: ['./rpg-painel.component.css']
})
export class RpgPainelComponent implements OnInit {

  public rpgId: number;
  public rpg: Rpg;
  public token: Token;

  private authUserSubscription: Subscription;
  private routeSubscription: Subscription;
  private rpgInPainelSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private helperService: HelperService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => this.rpg = rpg);

    this.authUserSubscription =this.authService.seeAuthUser
    .subscribe((token: Token) => this.token = token);
      
    this.routeSubscription = this.route.params
    .subscribe((params: any) => {
      this.rpgId = params['idRpg'];
      this.rpgService.rpg(this.rpgId);
    });
  }

  register(rpgId: number) {
    if (this.helperService.tokenValidate(this.token) && this.helperService.idValidate(rpgId)) {
      this.rpgService.register(rpgId)
      .subscribe(
        (response: Rpg) => this.rpgService.rpg(this.rpgId),
        (error: HttpErrorResponse) => console.log(error)
      );
    }
  }

  ngOnDestroy(): void {
    this.rpgService.rpgInPainel.next(null);
    this.routeSubscription.unsubscribe();
    this.authUserSubscription.unsubscribe();
    this.rpgInPainelSubscription.unsubscribe();
  }

}
