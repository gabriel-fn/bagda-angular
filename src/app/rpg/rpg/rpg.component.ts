import { Component, OnInit } from '@angular/core';

import { Subscription } from '../../../../node_modules/rxjs';

import { RpgService } from '../rpg.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'eth-rpg',
  templateUrl: './rpg.component.html',
  styleUrls: ['./rpg.component.css']
})
export class RpgComponent implements OnInit {

  public rpgs: any[];

  private rpgSubscription: Subscription;

  constructor(private rpgService: RpgService) { }

  ngOnInit(): void {
    this.rpgSubscription = this.rpgService.rpgs().subscribe(
      (response: any) => {
        this.rpgs = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.rpgSubscription.unsubscribe();
  }

}
