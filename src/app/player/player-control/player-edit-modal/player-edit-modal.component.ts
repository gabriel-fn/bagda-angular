import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Player, Item, HttpSuccessResponse } from '../../../shared/interfaces';
import { HelperService } from '../../../shared/helper.service';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'eth-player-edit-modal',
  templateUrl: './player-edit-modal.component.html',
  styleUrls: ['./player-edit-modal.component.css']
})
export class PlayerEditModalComponent implements OnInit {
  
  @ViewChild('imagePlayer') imagePlayer: ElementRef; 
  public form: FormGroup;
  public player: Player;

  constructor(public helperService: HelperService,
              private playerService: PlayerService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<PlayerEditModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {player: Player}) { }

  ngOnInit(): void {
    this.player = this.data.player;
    this.form = this.formBuilder.group({
      player_id: [ this.player.id, [ Validators.required ] ],
      credential: [ this.player.credential, [ Validators.required ] ],
      gold: [ this.player.gold, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      cash: [ this.player.cash, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      detail: [ this.player.detail, [ 
        Validators.max(5000) 
      ] ],
      image: [ null ]
    });
  }

  isFieldInvalid(field: string) {
    return this.form.get(field).invalid;
  }

  handleFileInput(files: FileList) {
    if (files && files.length > 0) {
      this.form.get('image').setValue(files.item(0));
    }
  }

  clearFileInput() {
    this.form.get('image').setValue(null);
    this.imagePlayer.nativeElement.value = null;
  }

  updateForm(player: Player) {
    this.form.patchValue({
      'credential': player.credential,
      'gold': player.gold,
      'cash': player.cash,
      'detail': player.detail,
    });
    this.player = player;
  }

  updatePlayer(): void {
    if (this.form.valid && this.playerService.editPlayerValidate(this.player)) {
      this.helperService.showLoading();
      this.playerService.update(this.form.value)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.helperService.showResponse(response);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading();
        }
      );
      this.clearFileInput();
    }
  }

  discardItem(item: Item): void {
    if (this.playerService.editPlayerValidate(this.player)) {
      this.helperService.showLoading();
      this.playerService.discardItem(item.process.player_id, item.process.item_id)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.updateForm(response['data']);
          this.helperService.showResponse(response);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading();
        }
      );
    }
  }

  dismissRequest(request: Item): void {
    if (this.playerService.editPlayerValidate(this.player)) {
      this.helperService.showLoading();
      this.playerService.dismissRequest(request.process.player_id, request.process.item_id)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.updateForm(response['data']);
          this.helperService.showResponse(response);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading();
        },
      );
    }
  }

  approveRequest(request: Item) {
    if (this.playerService.editPlayerValidate(this.player)) {
      this.helperService.showLoading();
      this.playerService.approveRequest(request.process.player_id, request.process.item_id)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.updateForm(response['data']);
          this.helperService.showResponse(response);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading();
        },
      );
    }
  }
}
