import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { Rpg, HttpSuccessResponse } from '../../shared/interfaces';
import { RpgService } from '../rpg.service';
import { HelperService } from '../../shared/helper.service';
import { ValidateService } from '../../shared/validate.service';

@Component({
  selector: 'eth-rpg-control',
  templateUrl: './rpg-control.component.html',
  //styleUrls: ['./rpg-control.component.css']
})
export class RpgControlComponent implements OnInit {

  @ViewChild('capaRpg') capaInput: ElementRef; 
  public form: FormGroup;
  public rpgId: number; 
  public rpg: Rpg;

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private helperService: HelperService,
              private validateService: ValidateService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rpg_id: [ null, [ Validators.required ] ],
      name: [ null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ] ],
      gold_starter: [ null, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      cash_starter: [ null, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      is_public: [ null, [ Validators.required ] ],
      image: [ null ]
    });

    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => { 
      this.rpg = rpg;
      this.form.patchValue({ 
        'rpg_id': rpg.id,
        'name': rpg.name, 
        'gold_starter': rpg.gold_starter, 
        'cash_starter': rpg.cash_starter,
        'is_public': rpg.is_public,
      });
    });

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }

  get playersWithRequests() {
    return this.rpg.players.reduce((total, player) => total += player.requests.length, 0);
  }

  isFieldInvalid(field: string) {
    return this.form.get(field).invalid;
  }

  playersWithCredential(credential: number) {
    return this.rpg.players.filter((player) => player.credential == credential);
  }

  handleFileInput(files: FileList) {
    if (files && files.length > 0) {
      this.form.get('image').setValue(files.item(0));
    }
  }

  clearFileInput() {
    this.form.get('image').setValue(null);
    this.capaInput.nativeElement.value = null;
  }

  updateRpg() {
    if (this.form.valid && this.validateService.token() && this.validateService.master()) {
      this.helperService.showLoading();
      this.rpgService.update(this.form.value)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.helperService.showResponse(response);
          this.rpgService.rpg(this.rpgId);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading();
        }
      );
      this.clearFileInput();
    }
  }

  deleteRpg() {
    if (this.validateService.token() && this.validateService.master()) {
      this.helperService.openConfirm('Tem certeza que deseja apagar este rpg?')
      .subscribe((result) => {
        if (result) {
          this.helperService.openConfirm('REALMENTE tem certeza que deseja apagar este rpg?!')
          .subscribe((result) => { 
            if (result) {
              this.helperService.openConfirm('Você REALMENTE REALMENTE tem certeza que deseja apagar este rpg?! Definitivamente sem ter como recuperar?!')
              .subscribe((result) => { 
                if (result) {
                  this.helperService.showLoading();
                  this.rpgService.delete(this.rpg.id)
                  .subscribe(
                    (response: HttpSuccessResponse) => {
                      this.helperService.showResponse(response);
                      this.rpgService.rpg(this.rpgId);
                      this.helperService.hideLoading();
                    },
                    (error: HttpErrorResponse) => {
                      this.helperService.hideLoading();
                    }
                  );
                }
              });
            }
          });
        }
      });  
    }
  }

  registerResponse(player_id: number, accept: boolean) {
    if (this.validateService.id(player_id) && this.validateService.token() && this.validateService.moderator()) {
      this.helperService.showLoading();
      this.rpgService.registerResponse(player_id, accept)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.helperService.showResponse(response);
          this.rpgService.rpg(this.rpgId);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading();
        }
      );    
    }
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
