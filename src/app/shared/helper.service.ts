import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
//import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { HttpSuccessResponse } from './interfaces';
import { LoaderService } from './loader/loader.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrl: string = 'http://localhost:8000';

  constructor(private toastr: ToastrService,
              public dialog: MatDialog,
              //private spinner: NgxSpinnerService,
              private loaderService: LoaderService) { }

  status(credential: number): string {
    let credentialNames = ['Pedido Pendente', 'Jogador', 'Moderador', 'Mestre Auxiliar', 'Mestre'];
    return credentialNames[credential];
  }

  openConfirm(message: string = 'Tem certeza de realizar esta ação?'): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: message
    });
    return dialogRef.beforeClose();
  }

  showLoading(): void {
    //this.spinner.show();
    this.loaderService.show();
  }

  hideLoading(): void {
    //this.spinner.hide();
    this.loaderService.hide();
  }

  showError(message: string): void {
    this.toastr.error(message, 'Aviso de erro!');
  }

  showInfo(message: string): void {
    this.toastr.info(message);
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Resposta:');
  }

  showResponse(response: HttpSuccessResponse): void {
    if (response.error) {
      this.showError(response.message);
    } else {
      this.showSuccess(response.message);
    }
  }
}
