import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { RpgService } from '../rpg.service';

@Component({
  selector: 'app-rpg-painel',
  templateUrl: './rpg-painel.component.html',
  styleUrls: ['./rpg-painel.component.css']
})
export class RpgPainelComponent implements OnInit {

  public rpg: any = null;

  private rpgSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.rpgSubscription = this.rpgService.rpg(id).subscribe(
          (response: any) => {
            console.log(response);
            this.rpg = response;
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.rpgSubscription.unsubscribe();
  }

}
