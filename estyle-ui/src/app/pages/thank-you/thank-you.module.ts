import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouRoutingModule } from './thank-you-routing.module';
import { ThankYouComponent } from './thank-you.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ThankYouComponent],
  imports: [CommonModule, ThankYouRoutingModule, SharedModule],
})
export class ThankYouModule {}
