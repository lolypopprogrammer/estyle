import {Component, HostListener, Input, OnInit} from '@angular/core';
import {OperationsService} from './operations.service';

const SAVE_OPERATION = {
  name: 'Save',
  action: 'save',
};

const SAVE_OPERATIONS = {
  save_as: {
    name: 'Create a new outfit',
    action: 'clone',
  }
}

export interface IOperation {
  name: string;
  action: string;
}

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  @Input() hiddenOperations: string[];
  @Input() id: string[];
  @Input() isDraft: string[];
  @Input() isPublic: string[];

  readonly stateButtonId = 'state-visibility';
  // visibilityOperations: IOperation[] = Object.values(OPERATIONS);
  saveOperations: IOperation[] = Object.values(SAVE_OPERATIONS);
  dropdownIsVisible: boolean = false;
  saveDropdownIsVisible: boolean = false;
  // selectedVisibility: string = OPERATIONS.draft.name;
  saveOperation = SAVE_OPERATION;

  constructor(private operationsService: OperationsService) {
  }

  ngOnInit(): void {
    if (this.id) {
      SAVE_OPERATION.action = 'patch';
      SAVE_OPERATION.name = 'save';
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    const isStateBtn = event.target.id === this.stateButtonId;
    if (!isStateBtn && (this.dropdownIsVisible || this.saveDropdownIsVisible)) this.hideVisibilityDropdown();
  }

  hideVisibilityDropdown() {
    this.dropdownIsVisible = false;
    this.saveDropdownIsVisible = false;
  }

  toggleStateVisibilityDropdown() {
    this.dropdownIsVisible = !this.dropdownIsVisible;
    this.saveDropdownIsVisible = false;
  }

  toggleSaveVisibilityDropdown() {
    this.saveDropdownIsVisible = !this.saveDropdownIsVisible;
    this.dropdownIsVisible = false;
  }

  select(feature): void {
    // if (SAVE_OPERATION.action !== feature.action) {
      // this.selectedVisibility = feature.name;
    // }

    this.operationsService.setEvent(feature);
  }
}
