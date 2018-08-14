import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Nl2BrPipeModule } from 'nl2br-pipe';
import {  MatTableModule, MatSortModule, MatPaginatorModule, 
          MatButtonModule, MatInputModule, MatFormFieldModule, 
          MatCardModule, MatSelectModule, MatExpansionModule, 
          MatListModule, MatDialogModule, MatProgressBarModule, 
          MatSidenavModule, MatToolbarModule, MatTabsModule, 
          MatChipsModule, MatTooltipModule, MatSlideToggleModule, MatIconModule } from '@angular/material';

import { ValidateInterceptor } from './interceptors/validate.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    Nl2BrPipeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  declarations: [
    LoaderComponent, 
    ConfirmModalComponent
  ],
  entryComponents: [ConfirmModalComponent],
  exports: [
    LoaderComponent,
    Nl2BrPipeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  providers: [
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: ValidateInterceptor, multi: true},
  ]
})
export class SharedModule { }
