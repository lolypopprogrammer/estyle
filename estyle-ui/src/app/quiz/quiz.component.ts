import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizItem, QuizService, Types} from './quiz.service';
import {QuizPostDto} from 'services/estyleApi';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {WindowRef} from '../core/services/window-ref';
import {filter, switchMap, takeUntil, tap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forIn} from 'lodash';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  group$: Observable<QuizItem[]> = this.quizService.group$;
  currentGroup$: Observable<QuizItem> = this.quizService.currentGroup$;
  activeGroup$: Observable<number> = this.quizService.activeGroup$;
  showFinishButton$: Observable<boolean> = this.quizService.showFinishButton$;
  progress$ = this.quizService.progress$;
  state$ = this.quizService.state$;
  formEnabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formEnabled$: Observable<boolean> = this.formEnabledSubject$.asObservable();

  private readonly unsubscribe$ = new Subject<void>();

  form: FormGroup;
  isSubmitted = false;

  get checkboxType(): string {
    return Types.CHECKBOX;
  }

  get radioType(): string {
    return Types.RADIO;
  }

  get inputSizeType(): string {
    return Types.INPUT_SIZE;
  }

  get textareaType(): string {
    return Types.TEXTAREA;
  }

  constructor(
    private quizService: QuizService,
    private windowRef: WindowRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.addFormControls();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectGroup(index: number): void {
    if (this.form.invalid) {
      this.isSubmitted = true;
      return;
    }

    this.isSubmitted = false;

    this.quizService.selectGroup(index);

    this.scrollTop();
  }

  start(): void {
    this.quizService.start();
  }

  finish(): void {
    const request: Partial<QuizPostDto> = {};

    forIn(this.form.value, (value, key) => {
      const keys = key.split('.');

      if (!request[keys[0]]) {
        request[keys[0]] = {};
      }

      if (value) {
        request[keys[0]][keys[1]] = value;
      }
    })

    if (request.personalityAnswers) {
      request.personalityAnswers = Object.values(request.personalityAnswers);
    }

    this.quizService.submit(request as QuizPostDto);

  }

  createForm(): void {
    this.form = this.fb.group({});
    this.enableForm();
  }

  enableForm(): void {
    this.formEnabledSubject$.next(true);
  }

  addFormControls(): void {
    this.formEnabled$.pipe(
      filter(enabled => enabled),
      switchMap(() => this.currentGroup$),
      tap(currentGroup => {
        currentGroup.questions.forEach(q => {
          if (q.type === this.radioType || q.type === this.checkboxType) {
            const control = this.fb.control(null, q.answers[0].required ? [Validators.required] : []);
            const key = q.answers[0].key;

            if (!this.form.controls[key]) {
              this.form.addControl(key, control);
            }
          } else {
            q.answers.forEach(a => {
              const control = this.fb.control(null, a.required ? [Validators.required] : []);
              const key = a.key;

              if (!this.form.controls[key]) {
                this.form.addControl(key, control);
              }
            });
          }
        });
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  onSubmit(event): void {
    if (this.form.invalid) {
      this.isSubmitted = true;
      return;
    }

    this.isSubmitted = false;

    this.finish();
  }

  scrollTop(): void {
    setTimeout(() =>
      this.windowRef.nativeWindow.scrollTo({top: 0, behavior: 'smooth'})
    );
  }
}
