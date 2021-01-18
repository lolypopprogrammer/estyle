import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'brand-profile-page',
  templateUrl: './brand-profile.component.html',
  styleUrls: ['./brand-profile.component.scss'],
})
export class BrandProfileComponent implements OnInit {
  id: string;
  isChanging: boolean = false;
  isCreatingCollection: boolean = false;
  isBackgroundLoaded: boolean = false;
  isAuthorthubmnailLoaded: boolean = false;
  isUpdate: boolean;
  thumbnailBrandData: any;
  backgroundBrandData: any;
  firstSliderPicture: any;
  secondSliderPicture: any;
  thirdSliderPicture: any;
  @Input() isOwner: boolean;
  user: any = [];
  cards: any;
  hasMore: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService
  ) {
    activateRoute.params.subscribe((params) => (this.id = params['id']));
  }

  ngOnInit(): void {
    this.api.getUserById(this.id).subscribe((data) => {
      this.user = data;
      this.isOwner = this.api.currenUser['id'] === this.id;
    });
    this.api
      .getOutfits({
        isPublic: true,
        id: this.id,
      })
      .subscribe((data: any) => {
        this.cards = data.data;
        if (data.total > 6) this.hasMore = true;
      });
  }
  goToClothesBuilder(): void {
    this.router.navigate(['clothes-builder']);
  }

  toChanging(): void {
    this.isChanging = true;
  }

  saveChanges(): void {
    const form = new FormData();
    if (this.thumbnailBrandData) {
      form.append('thumbnailBrandData', this.thumbnailBrandData);
      this.isAuthorthubmnailLoaded = true;
    }
    if (this.backgroundBrandData) {
      form.append('backgroundBrandData', this.backgroundBrandData);
      this.isBackgroundLoaded = true;
    }
    if (this.firstSliderPicture) {
      form.append('firstSliderPicture', this.firstSliderPicture);
    }
    if (this.secondSliderPicture) {
      form.append('secondSliderPicture', this.secondSliderPicture);
    }
    if (this.thirdSliderPicture) {
      form.append('thirdSliderPicture', this.thirdSliderPicture);
    }

    this.api.patchUser(form).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully patched!', 'Success');
        this.isBackgroundLoaded = false;
        this.isAuthorthubmnailLoaded = false;
      },
      error: ({ error }) => {
        switch (error.message[0]) {
          case 'category must be a mongodb id':
            this.toastr.error('category is required', 'Error');
            break;
          default:
            this.toastr.error(error.message, 'Error');
            break;
        }
      },
    });

    this.isChanging = false;
  }

  subscribeAuthorThumbnail(event): void {
    this.thumbnailBrandData = event.target.files[0];
  }
  subscribeAuthorBackground(event): void {
    this.backgroundBrandData = event.target.files[0];
  }
  openPopupCreateCollection(): void {
    this.isCreatingCollection = true;
  }
  closePopup(event): void {
    this.isCreatingCollection = false;
  }
  firstSlider(event): void {
    this.firstSliderPicture = event.target.files[0];
  }
  secondSlider(event): void {
    this.secondSliderPicture = event.target.files[0];
  }
  thirdSlider(event): void {
    this.thirdSliderPicture = event.target.files[0];
  }
  occasionFilter(event) {
    this.api
      .getOutfits({
        isPublic: true,
        id: this.id,
        collectionId: event ? event.target.id : '',
      })
      .subscribe((data: any) => {
        this.cards = data.data;
        if (data.total > 6) this.hasMore = true;
      });
  }
}
