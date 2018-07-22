import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Rpg, Token, Player } from '../../shared/interfaces';
import { RpgService } from '../rpg.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-rpg-painel',
  templateUrl: './rpg-painel.component.html',
  styleUrls: ['./rpg-painel.component.css']
})
export class RpgPainelComponent implements OnInit {

  public rpg: Rpg;
  public token: Token;

  private rpgSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.authService.authUser.getValue();

    this.route.params.subscribe(
      (params: any) => {
        let id = params['idRpg'];

        this.rpgSubscription = this.rpgService.rpg(id).subscribe(
          (response: Rpg) => {
            this.rpg = response;
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      }
    );
  }

  register (rpgId: number) {
    if (this.token) {
      this.rpgService.register(rpgId).subscribe(
        (response: Rpg) => {
          //console.log(response);
          this.rpg = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.rpgSubscription.unsubscribe();
  }

}
