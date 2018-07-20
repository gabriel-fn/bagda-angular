import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { PlayerModalComponent } from '../player-modal/player-modal.component';

@Component({
  selector: 'eth-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public rpg: any; 

  @Input() ofRpg: number = null;
  //@Input() pageSize: number = 5;
  //@Input() page: number = 1;

  private playerSubscription: Subscription;

  constructor(private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.playerSubscription = this.userService.players(this.ofRpg).subscribe(
      (response: any) => {
        this.rpg = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  open(player) {
    const modalRef = this.modalService.open(
      PlayerModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.componentInstance.player = player;
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
  }

}
