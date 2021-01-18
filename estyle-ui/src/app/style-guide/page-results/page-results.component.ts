import { Component, OnInit } from '@angular/core';
import { Quiz } from 'services/estyleApi';
import { CurrentUserService } from 'src/app/core/services/current-user/current-user.service';
import { QuizService } from 'src/app/quiz/quiz.service';

@Component({
  selector: 'app-page-results',
  templateUrl: './page-results.component.html',
  styleUrls: ['./page-results.component.scss']
})
export class PageResultsComponent {
  quiz$ = this.currentUser.quiz$;

  constructor(
    private readonly currentUser: CurrentUserService,
  ) {
  }

  getBodytype(bodytype: Quiz.HorizontalBodyShapeEnum) {
    switch (bodytype) {
      case Quiz.HorizontalBodyShapeEnum.Diamond:
        return 'Diamond';
      case Quiz.HorizontalBodyShapeEnum.Hourglass:
        return 'Hourglass';
      case Quiz.HorizontalBodyShapeEnum.InvertedTriangular:
        return 'Inverted triangular';
      case Quiz.HorizontalBodyShapeEnum.Oval:
        return 'Oval';
      case Quiz.HorizontalBodyShapeEnum.Rectangular:
        return 'Rectangular';
      case Quiz.HorizontalBodyShapeEnum.Triangular:
        return 'Triangular';
    }
  }

  getVerticalBodytype(bodytype: Quiz.VerticalBodyShapeEnum) {
    switch (bodytype) {
      case Quiz.VerticalBodyShapeEnum.Balanced:
        return 'Balanced';
      case Quiz.VerticalBodyShapeEnum.LongLegsShortTorso:
        return 'Long legs, short torso';
      case Quiz.VerticalBodyShapeEnum.ShortLegsLongTorso:
        return 'Short legs, long torso';
    }
  }

}
