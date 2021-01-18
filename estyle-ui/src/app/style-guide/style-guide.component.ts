import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASE_PATH, QuizService, StyleGuideItemAttributeDto, StyleGuideItemDto } from 'services/estyleApi';

const DATA = [
  {
    blocks: [
      {
        type: 'category',
        text: 'Tops'
      },
      {
        type: 'title',
        text: 'Best tops for you'
      },
      {
        type: 'text',
        text: 'Lorem ipsum dolor sit amet, nisl ultrices tortor egestas volutpat faucibus id. Massa auctor quisque tempor porttitor quam. Et mollis maecenas feugiat amet, viverra erat et semper vestibulum, maecenas consectetuer quis nec, nec maecena turpis nunc pellentesque maecena quis. Feugiat '
      },
      {
        position: 'right',
        type: 'text-block-image',
        title: 'Style',
        description: 'Loose rather than body hugging',
        text: 'Loose rather than body hugging- Even out wider hips. However, tuck it in to prevent looking baggy as it makes you look bigger than you really are.Loose doesn’t mean oversized!',
      },
      {
        position: 'left',
        type: 'text-block-image',
        title: null,
        description: 'Body hugging or fitted tops',
        text: 'Body hugging or Fitted tops needs to have off-shoulder or “sabrina” necklines to balance the hips.',
      },
      {
        position: 'right',
        type: 'text-block-image',
        title: 'Length',
        description: 'Length of your tops',
        text: 'Length of your tops should end up at your waistline or anywhere between your waist and hips. Shorter the top will be more defined your waist will appear. Your legs will appear longer too. For the effect you can tuck  in front part or create  a knot  if possible .',
      }
    ]
  },
  {
    blocks: [
      {
        position: 'right',
        type: 'text-block-image',
        title: 'Neckline choices',
        description: 'Draped Neckline',
        text: 'Draped neckline compliments triangular shape as it is comparable to regular oval neckline.  Even better, It lifts up your breasts! It is ideal for any body shape',
      },
      {
        position: 'left',
        type: 'text-block-image',
        title: null,
        description: 'Regular V shape',
        text: 'Regular V shape neckline  prolongs your entire body & prolongs your neck.It is ideal for any body shape.',
      },
      {
        position: 'right',
        type: 'text-block-image',
        title: null,
        description: 'Regular or deep',
        text: 'Regular or deep ovals  widen the shoulder line.',
      },
      {
        position: 'left',
        type: 'text-block-image',
        title: 'Sleeves',
        description: 'Cap sleeves',
        text: 'Cap sleeves usually comes with diagonal cut that  slims down entire arm It is also one of the best options for triangular body shape. It attracts the attention to the upper part of the body.',
      }
    ]
  },
  {
    blocks: [
      {
        position: 'right',
        type: 'text-block-image',
        title: null,
        description: 'Regular short diagonal sleeve',
        text: 'Regular short diagonal sleeve is a great option for a pear shape with small to medium breast.The focal point is at the bust line. It visually creates illusion s of a bigger bust and widens your upper half',
      },
      {
        position: 'left',
        type: 'text-block-image',
        title: null,
        description: 'Set in sleeve',
        text: 'It is better to choose set in sleeves rather than sleeve without the sewing .With the pear body shape you need to define your shoulderline rather than mute it.',
      },
      {
        position: 'left',
        type: 'text-block-image',
        title: null,
        description: 'Horizontal lines',
        text: 'Horizontal lines (stripes) widen the upper part of the body and even out bigger hips, however it is not reccomended if a bigger belly or bigger bust size is one of the prominent features',
      },
      {
        position: 'right',
        type: 'text-block-image',
        title: null,
        description: 'Layering',
        text: 'Go for layering. \'Something sticking out always slims you down\' Go for layering if you are oval.',
      }
    ]
  },
  {
    blocks: [
      {
        position: 'right',
        type: 'text-block-image',
        title: null,
        description: '¾ sleeves',
        text: '¾ sleeves  (ideal for any kind of tops including blazers)\n focus point is at the waist line that gives definition to your waist. It is ideal solution for your body shape ',
      },
      {
        position: 'left',
        type: 'text-block-image',
        title: null,
        description: 'Short straight sleeve',
        text: 'Short straight sleeves widen the upper part of the body due to the straight sleeves creating a horizontal line pointing at the bust line.',
      },
      {
        position: 'right',
        type: 'text-block-image',
        title: null,
        description: 'Half length sleeve',
        text: 'Half length sleeve compliments your body shape, try and stay small as the wider you go it will add volume to your midsection.',
      },
      {
        position: 'left',
        type: 'text-block-image',
        title: 'Sleeves',
        description: 'Cap sleeves',
        text: 'Cap sleeves usually comes with diagonal cut that  slims down entire arm It is also one of the best options for triangular body shape. It attracts the attention to the upper part of the body.',
      },
    ]
  },
  {
    blocks: [
      {
        type: 'sub-title',
        text: 'AVOID These\n Tops'
      }
    ]
  },
];

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss']
})
export class StyleGuideComponent implements OnInit {
  data$: BehaviorSubject<any[]> = new BehaviorSubject(undefined);
  style;

  constructor(
    @Inject(BASE_PATH) private readonly basePath: string,
    private readonly quizService: QuizService,
  ) {}

  ngOnInit(): void {
    this.quizService.quizControllerGetQuizResults()
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(undefined);
        })
      )
      .subscribe((data) => {
        const items = [];
        this.style = data.style;
        data.results.forEach((item: StyleGuideItemDto) => {
          const current = [];
          current.push({
            type: 'category',
            // @ts-ignore
            text: item.clothingCategory.name,
          });
          current.push({
            type: 'title',
            text: item.title,
          });
          if (item.description) {
            current.push({
              type: 'text',
              text: item.description,
            });
          }
          const toRecommend: any[] = item.attributes.filter(atr => atr.type === StyleGuideItemAttributeDto.TypeEnum.Recommend);
          if (toRecommend.length > 0) {
            toRecommend.sort((a: any, b: any) => {
              a = a.attribute.type._id;
              b = b.attribute.type._id;
              if (a === b) {
                return 0;
              }
              return a < b ? -1 : 1;
            });
            current.push(...toRecommend.map((atr: any, index) => ({
              position: index % 2 === 0 ? 'right' : 'left',
              type: 'text-block-image',
              title: index === 0 || atr.attribute.type._id !== toRecommend[index - 1].attribute.type._id ?
                atr.attribute.type.name :
                undefined,
              picture: atr.picture ? `${this.basePath}/${atr.picture}` : undefined,
              // @ts-ignore
              description: atr.attribute.name,
              text: atr.description,
            })));
          }
          const toAvoid: any[] = item.attributes.filter(atr => atr.type === StyleGuideItemAttributeDto.TypeEnum.Avoid);
          if (toAvoid.length === 0) {
            items.push({
              // @ts-ignore
              title: item.clothingCategory.name,
              blocks: current,
            });
            return;
          }
          toAvoid.sort((a: any, b: any) => {
            a = a.attribute.type._id;
            b = b.attribute.type._id;
            if (a === b) {
              return 0;
            }
            return a < b ? -1 : 1;
          });
          current.push({
            type: 'sub-title',
            // @ts-ignore
            text: `AVOID These\n ${item.clothingCategory.name}`
          });
          current.push(...toAvoid.map((atr, index) => ({
            position: index % 2 === 0 ? 'right' : 'left',
            type: 'text-block-image',
            title: index === 0 || atr.attribute.type._id !== toRecommend[index - 1].attribute.type._id ?
              atr.attribute.type.name :
              undefined,
            picture: atr.picture ? `${this.basePath}/${atr.picture}` : undefined,
            // @ts-ignore
            description: atr.attribute.name,
            text: atr.description,
          })));
          items.push({
            // @ts-ignore
            title: item.clothingCategory.name,
            blocks: current,
          });
        });
        this.data$.next(items);
        console.log(data);
      });
  }

}
