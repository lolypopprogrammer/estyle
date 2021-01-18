import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { CheckboxModule } from '../ui/controls/checkbox/checkbox.module';
import { SafePipe } from '../core/pipes/safe.pipe';
import { PaginationModule } from '../ui/pagination/pagination.module';
import { UiModule } from '../ui/ui.module';
import { ProgressBarModule } from '../ui/progress-bar/progress-bar.module';
import { PopoverModule } from '../ui/popover/popover.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupModule } from "../ui/controls/checkbox-group/checkbox-group.module";
import {CheckboxGroupMultiplyModule} from "../ui/controls/checkbox-group-multiply/checkbox-group-multiply.module";


@NgModule({
    declarations: [QuizComponent, SafePipe],
    exports: [
        SafePipe
    ],
    imports: [
        CommonModule,
        QuizRoutingModule,
        CheckboxModule,
        PaginationModule,
        UiModule,
        ProgressBarModule,
        PopoverModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxModule,
        CheckboxModule,
        CheckboxGroupModule,
        CheckboxGroupMultiplyModule,
    ]
})
export class QuizModule { }
