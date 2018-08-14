import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Rpg, HttpSuccessResponse } from '../../shared/interfaces';
import { RpgService } from '../rpg.service';
import { HelperService } from '../../shared/helper.service';
import { ValidateService } from '../../shared/validate.service';

@Component({
  selector: 'eth-rpg-painel',
  templateUrl: './rpg-painel.component.html',
  styleUrls: ['./rpg-painel.component.css']
})
export class RpgPainelComponent implements OnInit {

  public rpgId: number;
  public rpg: Rpg;

  private routeSubscription: Subscription;
  private rpgInPainelSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private helperService: HelperService,
              private validateService: ValidateService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => this.rpg = rpg);
      
    this.routeSubscription = this.route.params
    .subscribe((params: any) => {
      this.rpgId = params['idRpg'];
      this.rpgService.rpg(this.rpgId);
    });
  }

  register(rpgId: number) {
    if (this.validateService.token() && this.validateService.id(rpgId)) {
      this.helperService.openConfirm('Tem certeza que quer realizar a inscrição/desinscrição deste rpg? (Cuidado ao realizar está ação)')
      .subscribe((result) => {
        if (result) {
          this.helperService.showLoading();
          this.rpgService.register(rpgId)
          .subscribe(
            (response: HttpSuccessResponse) => {
              this.rpgService.rpg(this.rpgId);
              this.helperService.showResponse(response);
              this.helperService.hideLoading();
            },
            (error: HttpErrorResponse) => {
              this.helperService.hideLoading();
            }
          );
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.rpgService.rpgInPainel.next(null);
    this.routeSubscription.unsubscribe();
    this.rpgInPainelSubscription.unsubscribe();
  }

}
