import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpSuccessResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrl: string = 'http://localhost:8000';

  constructor(private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  status(credential: number): string {
    let credentialNames = ['Pedido Pendente', 'Jogador', 'Moderador', 'Mestre Auxiliar', 'Mestre'];
    return credentialNames[credential];
  }

  showLoading(): void {
    this.spinner.show();
  }

  hideLoading(): void {
    this.spinner.hide();
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
