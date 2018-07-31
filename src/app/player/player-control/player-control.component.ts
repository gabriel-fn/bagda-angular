import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Rpg, Player } from '../../shared/interfaces';
import { RpgService } from '../../rpg/rpg.service';
import { PlayerEditModalComponent } from '../player-edit-modal/player-edit-modal.component';
import { HelperService } from '../../shared/helper.service';



@Component({
  selector: 'eth-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.css']
})
export class PlayerControlComponent implements OnInit {

  public rpg: Rpg; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'credential', 'gold', 'cash', 'request_number', 'action'];
  dataSource;

  private rpgInPainelSubscription: Subscription;

  constructor(private rpgService: RpgService,
              public helperService: HelperService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => {
      this.rpg = rpg;
      this.dataSource = new MatTableDataSource<Player>(this.rpg.players);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open(player: Player) {
    const modalRef = this.modalService.open(
      PlayerEditModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.componentInstance.player = player;
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
  }

}
