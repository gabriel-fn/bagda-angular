import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

import { Rpg, Player, HttpSuccessResponse } from '../../shared/interfaces';
import { RpgService } from '../../rpg/rpg.service';
import { PlayerEditModalComponent } from '../player-edit-modal/player-edit-modal.component';
import { HelperService } from '../../shared/helper.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'eth-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.css']
})
export class PlayerControlComponent implements OnInit {

  public rpg: Rpg; 
  public rpgId: number; 
  public filter: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'credential', 'gold', 'cash', 'request_number', 'action'];
  dataSource;

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private playerService: PlayerService,
              public helperService: HelperService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => {
      this.rpg = rpg;
      this.dataSourceSync();
    });

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }

  applyFilter(filterValue: string) {
    this.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filter;
  }

  dataSourceSync() {
    this.dataSource = new MatTableDataSource<Player>(this.rpg.players);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filter;
  }

  open(player: Player) {
    const dialogRef = this.dialog.open(PlayerEditModalComponent, {
      width: '1000px',
      data: {player: player}
    });
    dialogRef.beforeClose().subscribe(result => {
      this.rpgService.rpg(this.rpgId);
    });
  }

  deletePlayer(player: Player) {
    if (this.playerService.editPlayerValidate(player)) {
      this.helperService.openConfirm('Tem certeza que quer apagar este jogador?')
      .subscribe((result) => {
        if (result) {
          this.helperService.showLoading();
          this.playerService.delete(player.id)
          .subscribe(
            (response: HttpSuccessResponse) => {
              this.helperService.showResponse(response);
              this.rpgService.rpg(this.rpgId);
              this.helperService.hideLoading();
            },
            (error: HttpErrorResponse) => {
              console.log(error);
              this.helperService.hideLoading();
            }
          );
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
