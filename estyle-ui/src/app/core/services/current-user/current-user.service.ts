import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quiz, QuizService, User, UserService } from 'services/estyleApi';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private _quiz$ = new BehaviorSubject<Quiz>(undefined);
  private _user$ = new BehaviorSubject<User>(undefined);

  constructor(
    private readonly quizService: QuizService,
    private readonly userService: UserService,
  ) {}

  init() {
    combineLatest([
      this.userService.userControllerGetCurrentUser(),
      this.quizService.quizControllerGetQuiz(),
    ])
      .pipe(catchError((err) => {
        return of(undefined);
      }))
      .subscribe((data) => {
        if (!data) {
          return;
        }
        this._user$.next(data[0]);
        this._quiz$.next(data[1]);
      });
  }

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  get quiz$(): Observable<Quiz> {
    return this._quiz$.asObservable();
  }
}
