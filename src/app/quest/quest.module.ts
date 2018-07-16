import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestRoutingModule } from './quest-routing.module';
import { QuestComponent } from './quest/quest.component';
import { QuestService } from './quest.service';

@NgModule({
  imports: [
    CommonModule,
    QuestRoutingModule
  ],
  declarations: [QuestComponent],
  exports: [QuestComponent],
  providers: [QuestService]
})
export class QuestModule { }
