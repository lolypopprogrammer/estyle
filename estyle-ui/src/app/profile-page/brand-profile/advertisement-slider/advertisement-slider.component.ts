import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NguCarouselStore } from '@ngu/carousel';
import { ApiService } from 'src/app/core/services/api/api.service';

const IMAGES = [
  'assets/images/1.png',
  'assets/images/1.png',
  'assets/images/1.png',
];

@Component({
  selector: 'app-advertisement-slider',
  templateUrl: './advertisement-slider.component.html',
  styleUrls: ['./advertisement-slider.component.scss'],
})
export class AdvertisementSliderComponent implements OnInit {
  public carouselBanner;
  public images: any = IMAGES;
  @Input() isChanging: boolean = false;
  @Input() id: string;
  @Output() firstSliderPicture: EventEmitter<any> = new EventEmitter();
  @Output() secondSliderPicture: EventEmitter<any> = new EventEmitter();
  @Output() thirdSliderPicture: EventEmitter<any> = new EventEmitter();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUserById(this.id).subscribe((data) => {
      this.images[0] = data['firstSliderPicture'] || 'assets/images/ai.png';
      this.images[1] = data['secondSliderPicture'] || 'assets/images/ai.png';
      this.images[2] = data['thirdSliderPicture'] || 'assets/images/ai.png';
    });
    this.carouselBanner = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: {
        timing: 3000,
        initialDelay: 1000,
      },
      // point: {
      //   visible: true
      // },
      // load: 2,
      loop: true,
      touch: true,
    };
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: NguCarouselStore) {}

  editBackground(event, j): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    switch (j) {
      case 0:
        reader.onload = (event) => (this.images[j] = event.target.result);
        reader.readAsDataURL(file);
        this.firstSliderPicture.emit(event);
        break;
      case 1:
        reader.onload = (event) => (this.images[j] = event.target.result);
        reader.readAsDataURL(file);
        this.secondSliderPicture.emit(event);
        break;
      case 2:
        reader.onload = (event) => (this.images[j] = event.target.result);
        reader.readAsDataURL(file);
        this.thirdSliderPicture.emit(event);
        break;
    }
  }
}
