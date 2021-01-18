import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPanelComponent } from './search-panel.component';

@NgModule({
  declarations: [SearchPanelComponent],
  exports: [SearchPanelComponent],
  imports: [CommonModule],
})
export class SearchPanelModule {}
