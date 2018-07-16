import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { QuestRoutingModule } from './quest-routing.module';
import { QuestComponent } from './quest/quest.component';
import { QuestService } from './quest.service';
import { QuestModalComponent } from './quest-modal/quest-modal.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    QuestRoutingModule
  ],
  entryComponents: [QuestModalComponent],
  declarations: [
    QuestComponent,
    QuestModalComponent
  ],
  exports: [QuestComponent],
  providers: [QuestService]
})
export class QuestModule { }
