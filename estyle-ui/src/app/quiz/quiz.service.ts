import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {QuizFeatures, QuizGoal, QuizPostDto, QuizService as ApiService} from 'services/estyleApi';

export enum Types {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  INPUT_SIZE = 'input-size',
  TEXTAREA = 'textarea'
}

export enum SizeTypes {
  WEIGHT = 'weight',
  LENGTH = 'length',
}

export interface Answer {
  text: string;
  type: Types;
  key: string;
  sizeType?: SizeTypes;
  value?: any;
  textarea?: {
    placeholder: string;
  };
  image?: string;
  isBust?: boolean;
  required?: boolean;
}

export interface Question {
  title: string;
  note?: string;
  answers: Answer[];
  type?: Types
}

export interface QuizItem {
  id: number;
  progressTitle: string;
  title: string;
  styleClass?: string;
  groupKey: string;
  questions: Question[];
}

const GROUP: QuizItem[] = [
  {
    id: 0,
    progressTitle: 'Personality',
    title: 'What do you want to achieve from </br> personalized styling?',
    groupKey: 'goals',
    questions: [
      {
        title: null,
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Get confidence',
            type: Types.CHECKBOX,
            value: QuizGoal.StyleGoalEnum.Confidence,
            key: 'goals.styleGoal'
          },
          {
            text: 'Have organized & styled wardrobe',
            type: Types.CHECKBOX,
            value: QuizGoal.StyleGoalEnum.Wardrobe,
            key: 'goals.styleGoal'
          }
        ]
      },
      {
        title: 'Look',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Younger',
            type: Types.CHECKBOX,
            value: QuizGoal.LookGoalEnum.Younger,
            key: 'goals.lookGoal'
          },
          {
            text: 'Slimmer',
            type: Types.CHECKBOX,
            value: QuizGoal.LookGoalEnum.Slimmer,
            key: 'goals.lookGoal'
          },
        ],
      },
      {
        title: 'Dress appropriate to my',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Age',
            type: Types.CHECKBOX,
            value: QuizGoal.DressGoalEnum.Age,
            key: 'goals.dressGoal'
          },
          {
            text: 'Occasion',
            type: Types.CHECKBOX,
            value: QuizGoal.DressGoalEnum.Occasion,
            key: 'goals.dressGoal'
          },
          {
            text: 'Personality',
            type: Types.CHECKBOX,
            value: QuizGoal.DressGoalEnum.Personality,
            key: 'goals.dressGoal'
          },
          {
            text: 'Job',
            type: Types.CHECKBOX,
            value: QuizGoal.DressGoalEnum.Job,
            key: 'goals.dressGoal'
          }
        ]
      },
      {
        title: 'Know what',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Colors should i wear',
            type: Types.CHECKBOX,
            value: QuizGoal.KnowledgeGoalEnum.Colors,
            key: 'goals.knowledgeGoal'
          }
        ]
      },
      {
        title: 'How to',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Mix & match clothes',
            type: Types.CHECKBOX,
            value: QuizGoal.HowToGoalEnum.MatchColors,
            key: 'goals.howToGoal'
          },
          {
            text: 'Accessorize clothes',
            type: Types.CHECKBOX,
            value: QuizGoal.HowToGoalEnum.Accessorize,
            key: 'goals.howToGoal'
          }
        ]
      }
    ]
  },
  {
    id: 1,
    progressTitle: 'Body measurements',
    title: null,
    groupKey: 'measurements',
    questions: [
      {
        title: 'What is your weight & height?',
        answers: [
          {
            text: 'Weight',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.WEIGHT,
            required: true,
            key: 'measurements.weight'
          },
          {
            text: 'Height',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.height'
          }
        ]
      },
      {
        title: 'What are your horizontal body measurements?',
        answers: [
          {
            text: 'Shoulder size',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            isBust: true,
            required: true,
            key: 'measurements.shoulderSize'
          },
          {
            text: 'Bust size',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            isBust: true,
            required: true,
            key: 'measurements.bustSize'
          },
          {
            text: 'Waist size',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.waistSize'
          },
          {
            text: 'Hip size',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.hipSize'
          },
          {
            text: 'Wrist size',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.wristSize'
          },
          {
            text: 'Ankle size',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.ankleSize'
          }
        ]
      },
      {
        title: 'What are your vertical measurements?',
        answers: [
          {
            text: 'Head to bust',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.headToBustSize'
          },
          {
            text: 'Bust to hip',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.bustToHipSize'
          },
          {
            text: 'Hip to knee',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.hipToKneeSize'
          },
          {
            text: 'Hip to floor',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.kneeToFloorSize'
          },
          {
            text: 'Neck length',
            type: Types.INPUT_SIZE,
            sizeType: SizeTypes.LENGTH,
            required: true,
            key: 'measurements.neckSize'
          }
        ]
      },
    ]
  },
  {
    id: 2,
    progressTitle: 'Prominent features',
    title: 'Please choose what is your personal perception <br/> of following prominent feature.',
    groupKey: 'features',
    questions: [
      {
        title: 'Do you consider your BUST size to be:',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Small',
            type: Types.CHECKBOX,
            value: QuizFeatures.BustSizeEnum.Small,
            key: 'features.bustSize',
          },
          {
            text: 'Big',
            type: Types.CHECKBOX,
            value: QuizFeatures.BustSizeEnum.Big,
            key: 'features.bustSize',
          }
        ]
      },
      {
        title: 'Do you consider your ARMS to be bigger or aged?',
        type: Types.RADIO,
        answers: [
          {
            text: 'Yes',
            type: Types.RADIO,
            value: true,
            key: 'features.hasLargerArms',
          },
          {
            text: 'No',
            type: Types.RADIO,
            value: false,
            key: 'features.hasLargerArms',
          }
        ]
      },
      {
        title: 'Do you have a PROBLEMATIC MIDSECTION?',
        note: '(bigger tummy, thicker waistline)',
        type: Types.RADIO,
        answers: [
          {
            text: 'Yes',
            type: Types.RADIO,
            value: true,
            key: 'features.hasProblematicMidsection',
          },
          {
            text: 'No',
            type: Types.RADIO,
            value: false,
            key: 'features.hasProblematicMidsection',
          }
        ]
      },
      {
        title: 'Do you have BIGGER THIGHS or HIPS?',
        type: Types.RADIO,
        answers: [
          {
            text: 'Yes',
            type: Types.RADIO,
            value: true,
            key: 'features.hasLargerThighsOrHips',
          },
          {
            text: 'No',
            type: Types.RADIO,
            value: false,
            key: 'features.hasLargerThighsOrHips',
          }
        ]
      },
      {
        title: 'Do you have large lower legs?',
        type: Types.RADIO,
        answers: [
          {
            text: 'Yes',
            type: Types.RADIO,
            value: true,
            key: 'features.hasLargeLegs',
          },
          {
            text: 'No',
            type: Types.RADIO,
            value: false,
            key: 'features.hasLargeLegs',
          }
        ]
      },
      {
        title: 'Do you consider your SHOULDERS to be:',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Narrow',
            type: Types.CHECKBOX,
            value: QuizFeatures.ShoulderSizeEnum.Narrow,
            key: 'features.shoulderSize',
          },
          {
            text: 'Wide',
            type: Types.CHECKBOX,
            value: QuizFeatures.ShoulderSizeEnum.Wide,
            key: 'features.shoulderSize',
          }
        ]
      },
      {
        title: 'Do you consider your SHOULDERS to be:',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Sloping down',
            type: Types.CHECKBOX,
            value: QuizFeatures.ShoulderShapeEnum.Sloping,
            key: 'features.shoulderShape',
          },
          {
            text: 'Nicely tappered (normal)',
            type: Types.CHECKBOX,
            value: QuizFeatures.ShoulderShapeEnum.Tapperd,
            key: 'features.shoulderShape',
          }
        ]
      }
    ]
  },
  {
    id: 3,
    progressTitle: 'Other',
    title: null,
    groupKey: 'unknown',
    questions: [
      {
        title: 'Describe how you wish to be seen by others:',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Classic',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Feminine',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Elegant',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Sporty',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Creative',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Provocative',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Conservative',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Well organized',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Wealthy',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Fashionable/Trendy',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Stylish',
            type: Types.CHECKBOX,
            key: 'unknown',
          }
        ]
      },
      {
        title: 'At this moment I need clothes for*',
        note: 'If you have any comments to any of mentioned areas, please do not hesitate to write it down and describe in details)',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Business',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Socializing / Entertaining',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Home',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Other (Specify)',
            type: Types.CHECKBOX,
            key: 'unknown',
            textarea: {
              placeholder: 'Type your message here*'
            }
          }
        ]
      },
      {
        title: 'I am more into wearing:',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Pants and jeans',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Dresses and skirts',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Balanced mixture',
            type: Types.CHECKBOX,
            key: 'unknown',
          }
        ]
      },
      {
        title: 'I am more into wearing:',
        type: Types.CHECKBOX,
        answers: [
          {
            text: 'Blouses',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Skirts',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'T-shirts',
            type: Types.CHECKBOX,
            key: 'unknown',
          },
          {
            text: 'Balanced mixture',
            type: Types.CHECKBOX,
            key: 'unknown',
          }
        ]
      },
      {
        title: 'What is your favorite fashion brand?',
        answers: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur tincidunt vel.',
            type: Types.INPUT_SIZE,
            key: 'unknown',
          }
        ]
      },
      {
        title: 'What is your favorite instagramer?',
        note: 'Lorem ipsum dolor sit amet, consectetur tincidunt vel.',
        answers: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur tincidunt vel.',
            type: Types.INPUT_SIZE,
            key: 'unknown',
          }
        ]
      }
    ]
  },
  {
    id: 4,
    progressTitle: 'Concerns',
    title: null,
    groupKey: 'unknown',
    questions: [
      {
        title: 'What clothes you really like but never had courage to wear?',
        answers: [
          {
            text: 'Type your message here*',
            type: Types.TEXTAREA,
            key: 'unknown',
          }
        ]
      }
    ]
  },
  {
    id: 5,
    progressTitle: 'Personality',
    title: null,
    styleClass: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4',
    groupKey: 'personalityAnswers.0',
    questions: [
      {
        title: 'What type of materials do you prefer:',
        note: 'Choose 2 very first options that comes to your mind after you read it all',
        type: Types.RADIO,
        answers: [
          {
            text: 'A. Highly structured, heavy, crisp',
            type: Types.RADIO,
            image: './assets/images/quiz/264.png',
            value: 'a',
            key: 'personalityAnswers.0',
          },
          {
            text: 'B. Soft, flowing (light) materials',
            type: Types.RADIO,
            image: './assets/images/quiz/157.png',
            value: 'b',
            key: 'personalityAnswers.0',
          },
          {
            text: 'C. Timeless, tailored yet easy materials',
            type: Types.RADIO,
            image: './assets/images/quiz/492.png',
            value: 'c',
            key: 'personalityAnswers.0',
          },
          {
            text: 'D. Natural materials (linen, cotton)',
            type: Types.RADIO,
            image: './assets/images/quiz/495.png',
            value: 'd',
            key: 'personalityAnswers.0',
          },
          {
            text: 'E. Timeless, luxury & expensive fabrics, superb tailoring',
            type: Types.RADIO,
            image: './assets/images/quiz/508.png',
            value: 'e',
            key: 'personalityAnswers.0',
          },
          {
            text: 'F. Any kind of materials in different mixture',
            type: Types.RADIO,
            image: './assets/images/quiz/404.png',
            value: 'f',
            key: 'personalityAnswers.0',
          },
          {
            text: 'G. Body hugging materials',
            type: Types.RADIO,
            image: './assets/images/quiz/504.png',
            value: 'g',
            key: 'personalityAnswers.0',
          }
        ]
      }
    ]
  },
  {
    id: 6,
    progressTitle: 'Personality',
    title: null,
    styleClass: 'grid grid-cols-2 gap-4',
    groupKey: 'personalityAnswers.1',
    questions: [
      {
        title: 'What colors and combination do you prefer:',
        note: 'Choose 2 very first options that comes to your mind after you read it all',
        type: Types.RADIO,
        answers: [
          {
            text: 'A. Sharp color contrast, bold or dark colors',
            type: Types.RADIO,
            image: './assets/images/quiz/235.png',
            value: 'a',
            key: 'personalityAnswers.1',
          },
          {
            text: 'B. Light to medium colors',
            type: Types.RADIO,
            image: './assets/images/quiz/340.png',
            value: 'b',
            key: 'personalityAnswers.1',
          },
          {
            text: 'C. Neutrals, max 2-3 colors with pops of bright on tops, shoes, bottoms',
            type: Types.RADIO,
            image: './assets/images/quiz/143.png',
            value: 'c',
            key: 'personalityAnswers.1',
          },
          {
            text: 'D. Light – medium colors, earthy colors with matte surface (linen, matte cotton)',
            type: Types.RADIO,
            image: './assets/images/quiz/311.png',
            value: 'd',
            key: 'personalityAnswers.1',
          },
          {
            text: 'E. Monochromatic (one color) or max 2 colored',
            type: Types.RADIO,
            image: './assets/images/quiz/139.png',
            value: 'e',
            key: 'personalityAnswers.1',
          },
          {
            text: 'F. More colors the better 209',
            type: Types.RADIO,
            image: './assets/images/quiz/209.png',
            value: 'f',
            key: 'personalityAnswers.1',
          },
          {
            text: 'G. Daring colors or combinations',
            type: Types.RADIO,
            image: './assets/images/quiz/540.png',
            value: 'g',
            key: 'personalityAnswers.1',
          }
        ]
      }
    ]
  },
  {
    id: 7,
    progressTitle: 'Personality',
    title: null,
    styleClass: 'grid grid-cols-2 gap-4',
    groupKey: 'personalityAnswers.2',
    questions: [
      {
        title: 'What patterns & embellishments do you prefer:',
        note: 'Choose 2 very first options that comes to your mind after you read it all',
        type: Types.RADIO,
        answers: [
          {
            text: 'A. Geometrics & abstracts patterns, fringe ',
            type: Types.RADIO,
            image: './assets/images/quiz/494.png',
            value: 'a',
            key: 'personalityAnswers.2',
          },
          {
            text: 'B. Flowery prints, dots, soft shapes, ruffles ',
            type: Types.RADIO,
            image: './assets/images/quiz/97.png',
            value: 'b',
            key: 'personalityAnswers.2',
          },
          {
            text: 'C. Plain, dots, stripes, geometric pattern',
            type: Types.RADIO,
            image: './assets/images/quiz/323.png',
            value: 'c',
            key: 'personalityAnswers.2',
          },
          {
            text: 'D. Plain, earthy motives, parsley pattern (missing the picture)',
            type: Types.RADIO,
            image: './assets/images/quiz/293750-P6YLFQ-271.png',
            value: 'd',
            key: 'personalityAnswers.2',
          },
          {
            text: 'E. Plain or subtle blended patterns ',
            type: Types.RADIO,
            image: './assets/images/quiz/280.png',
            value: 'e',
            key: 'personalityAnswers.2',
          },
          {
            text: 'F. Mixture of patterns, bold designs',
            type: Types.RADIO,
            image: './assets/images/quiz/188.png',
            value: 'f',
            key: 'personalityAnswers.2',
          },
          {
            text: 'G. Wild patterns (example: animal prints), love zippers as a garment embellishment ',
            type: Types.RADIO,
            image: './assets/images/quiz/457.png',
            value: 'g',
            key: 'personalityAnswers.2',
          }
        ]
      }
    ]
  },
  {
    id: 8,
    progressTitle: 'Personality',
    title: null,
    styleClass: 'grid grid-cols-2 gap-4',
    groupKey: 'personalityAnswers.3',
    questions: [
      {
        title: 'What kind of hairstyle do you prefer?',
        note: 'Choose 2 very first options that comes to your mind after you read it all',
        type: Types.RADIO,
        answers: [
          {
            text: 'A. Dark, slicked back, extreme long or short, highlighted using bold colors',
            type: Types.RADIO,
            image: './assets/images/quiz/294.png',
            value: 'a',
            key: 'personalityAnswers.3',
          },
          {
            text: 'B. Medium to long hairstyle, natural looking, bouncy, using headbands',
            type: Types.RADIO,
            image: './assets/images/quiz/316.png',
            value: 'b',
            key: 'personalityAnswers.3',
          },
          {
            text: 'C. Functional, easy to maintain, medium length ',
            type: Types.RADIO,
            image: './assets/images/quiz/46.png',
            value: 'c',
            key: 'personalityAnswers.3',
          },
          {
            text: 'D. Functional with the movement, any length, layered, using hair accessories ',
            type: Types.RADIO,
            image: './assets/images/quiz/495-2.png',
            value: 'd',
            key: 'personalityAnswers.3',
          },
          {
            text: 'E. Perfectly styled and controlled, symmetrical, natural colors',
            type: Types.RADIO,
            image: './assets/images/quiz/116.png',
            value: 'e',
            key: 'personalityAnswers.3',
          },
          {
            text: 'F. Any length, controlled or wild, natural or intense color',
            type: Types.RADIO,
            image: './assets/images/quiz/3.png',
            value: 'f',
            key: 'personalityAnswers.3',
          },
          {
            text: 'G. Styled- either partially covering face, curly, red blonde or dark brunette 257',
            type: Types.RADIO,
            image: './assets/images/quiz/257.png',
            value: 'g',
            key: 'personalityAnswers.3',
          }
        ]
      }
    ]
  },
  {
    id: 9,
    progressTitle: 'Personality',
    title: null,
    styleClass: 'grid grid-cols-2 gap-4',
    groupKey: 'personalityAnswers.4',
    questions: [
      {
        title: 'Which accessories you tend to wear?',
        note: 'Choose 2 very first options that comes to your mind after you read it all',
        type: Types.RADIO,
        answers: [
          {
            text: 'A. One of a kind pieces, exotic, unusually large scale',
            type: Types.RADIO,
            image: './assets/images/quiz/430.png',
            value: 'a',
            key: 'personalityAnswers.4',
          },
          {
            text: 'B. Curved designed accessories, small and medium sized pieces, low contrasted',
            type: Types.RADIO,
            image: './assets/images/quiz/440.png',
            value: 'b',
            key: 'personalityAnswers.4',
          },
          {
            text: 'C. traditional, simple, small to medium scale',
            type: Types.RADIO,
            image: './assets/images/quiz/407.png',
            value: 'c',
            key: 'personalityAnswers.4',
          },
          {
            text: 'D. minimal, comfortable, relaxed headbands, lightweight',
            type: Types.RADIO,
            image: './assets/images/quiz/437.png',
            value: 'd',
            key: 'personalityAnswers.4',
          },
          {
            text: 'E. Genuine, high quality piece, beautiful scarves, pearls, soft gold gem  stones',
            type: Types.RADIO,
            image: './assets/images/quiz/450.png',
            value: 'e',
            key: 'personalityAnswers.4',
          },
          {
            text: 'F. Any accessories can be used, unusual shape and size',
            type: Types.RADIO,
            image: './assets/images/quiz/435.png',
            value: 'f',
            key: 'personalityAnswers.4',
          },
          {
            text: 'G. Shiny gold, sparkling pieces, multiple bracelet, strappy high heel shoes or boots',
            type: Types.RADIO,
            image: './assets/images/quiz/447.png',
            value: 'g',
            key: 'personalityAnswers.4',
          }
        ]
      }
    ]
  },
  {
    id: 10,
    progressTitle: 'Personality',
    title: null,
    groupKey: 'personalityAnswers.5',
    questions: [
      {
        title: 'How would you describe yourself?',
        type: Types.RADIO,
        answers: [
          {
            text: 'A. I am seeking for an attention & excitement in my life and love to live in a big cities',
            type: Types.RADIO,
            value: 'a',
            key: 'personalityAnswers.5',
          },
          {
            text: 'B. I am very caring & sensitive person who loves to make others to feel comfortable around me',
            type: Types.RADIO,
            value: 'b',
            key: 'personalityAnswers.5',
          },
          {
            text: 'C. I am reliable, organized and loyal person',
            type: Types.RADIO,
            value: 'c',
            key: 'personalityAnswers.5',
          },
          {
            text: 'D. I am easy going, friendly, mostly informal and down to earth person.',
            type: Types.RADIO,
            value: 'd',
            key: 'personalityAnswers.5',
          },
          {
            text: 'E. I am mature & wise and financial stable person with the need to be best dressed in a room',
            type: Types.RADIO,
            value: 'e',
            key: 'personalityAnswers.5',
          },
          {
            text: 'F. I love to be original and unconventional',
            type: Types.RADIO,
            value: 'f',
            key: 'personalityAnswers.5',
          },
          {
            text: 'G. I am very confident and provocative person',
            type: Types.RADIO,
            value: 'g',
            key: 'personalityAnswers.5',
          }
        ]
      }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  progress$: Observable<number>;
  group$ = of(GROUP);
  currentGroup$: Observable<QuizItem>;
  activeGroupSubject$ = new BehaviorSubject(0);
  activeGroup$ = this.activeGroupSubject$.asObservable();
  stateSubject$ = new BehaviorSubject('init');
  state$: Observable<string> = this.stateSubject$.asObservable();
  showFinishButton$: Observable<boolean>;

  constructor(
    private readonly apiService: ApiService
  ) {
    this.currentGroup$ = this.activeGroup$.pipe(
      switchMap(activeGroup =>
        this.group$.pipe(
          map(group => group.filter((g, i) => i === activeGroup)[0])
        )
      )
    );

    this.progress$ = combineLatest([
      this.group$,
      this.activeGroup$
    ]).pipe(map(([group, activeGroup]) => {
      const size = group.length;

      return (activeGroup / size) * 100;
    }));

    this.showFinishButton$ = combineLatest([
      this.group$,
      this.activeGroup$
    ]).pipe(map(([group, activeGroup]) =>
      (group.length - 1) === activeGroup
    ));
  }

  selectGroup(index: number): void {
    this.activeGroupSubject$.next(index);
  }

  start(): void {
    this.stateSubject$.next('started');
  }

  finish(): void {
    this.stateSubject$.next('finished');
  }

/*  initForm(): FormArray {
    return new FormArray(GROUP.map((item) => new FormArray(
      item.questions.map(question => new FormArray(
        question.answers.map(answer => new FormControl(
          null,
          answer.required ? Validators.required : undefined,
        )),
      )),
    )));
  }*/

  submit(data: QuizPostDto) {
    return this.apiService.quizControllerSubmitQuiz(data)
      .pipe(catchError((err) => {
        return of(undefined);
      }))
      .subscribe((data) => {
        if (!data) {
          return;
        }
      });
  }

  get group(): QuizItem[] {
    return GROUP;
  }
}
