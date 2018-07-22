import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Rpg, Player } from '../../shared/interfaces';
import { UserService } from '../user.service';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'eth-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() rpg: Rpg; 

  //@Input() ofRpg: number = null;
  //@Input() pageSize: number = 5;
  //@Input() page: number = 1;

  //private playerSubscription: Subscription;

  constructor(//private userService: UserService,
              public helperService: HelperService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    /*this.playerSubscription = this.userService.players(this.ofRpg).subscribe(
      (response: Rpg) => {
        this.rpg = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );*/
  }

  open(player: Player) {
    const modalRef = this.modalService.open(
      PlayerModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.componentInstance.player = player;
  }

  ngOnDestroy(): void {
    //this.playerSubscription.unsubscribe();
  }

}
