import { RpgService } from './../rpg.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'eth-my-rpg',
  templateUrl: './my-rpg.component.html',
  styleUrls: ['./my-rpg.component.css']
})
export class MyRpgComponent implements OnInit {

  public rpgs: any[];

  private rpgSubscription: Subscription;

  constructor(private rpgService: RpgService) { }

  ngOnInit(): void {
    this.rpgSubscription = this.rpgService.userRpgs().subscribe(
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
