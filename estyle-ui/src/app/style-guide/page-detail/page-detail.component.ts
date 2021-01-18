import { Component } from '@angular/core';
import { Quiz } from 'services/estyleApi';
import { CurrentUserService } from 'src/app/core/services/current-user/current-user.service';
import { horizontalBodyshapeContent, verticalBodyshapeContent } from './content';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent {
  quiz$ = this.currentUser.quiz$;

  constructor(
    private readonly currentUser: CurrentUserService,
  ) {}

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

  getHorizontalBodytypeContent(bodytype: Quiz.HorizontalBodyShapeEnum) {
    return horizontalBodyshapeContent[bodytype];
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

  getVerticalBodytypeContent(bodytype: Quiz.VerticalBodyShapeEnum) {
    return verticalBodyshapeContent[bodytype];
  }

}
