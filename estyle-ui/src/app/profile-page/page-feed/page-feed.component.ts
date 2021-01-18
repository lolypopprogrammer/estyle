import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { SearchInApiService } from 'src/app/ui/search-panel/search-in-api.service';
import { ApiService } from '../../core/services/api/api.service';
import { ToastrService } from 'ngx-toastr';

enum UserTypes {
  'User' = 'User',
  'Brand' = 'Brand',
}

@Component({
  selector: 'app-profile-feed',
  templateUrl: './page-feed.component.html',
  styleUrls: ['./page-feed.component.scss'],
})
export class PageFeedComponent implements OnInit {
  @Input() id: string;
  @Input() type: String;
  @Output() isSearched = new EventEmitter<boolean>();

  userType: UserTypes = UserTypes.User;
  cards: any = [];
  authorThumbnail: string | ArrayBuffer = 'assets/images/ai.png';
  hasMore: boolean = false;
  firstName: string;
  lastName: string;
  userPhoto: string;
  status: string;
  isOwner: boolean = false;
  changingStatus: boolean = false;
  isSearching: boolean = false;
  cardsPool = [];
  filtredPool = { occasionId: [], shapeId: [], styleId: [] };
  isChanging: boolean = false;
  isAuthorthubmnailLoaded: boolean;
  thumbnailUserData: any;
  notSubscribe: boolean = true;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private occasion: SearchInApiService,
    private toastr: ToastrService
  ) {
    this.occasion.onClick.subscribe((occasion) => {
      if (occasion.hasOwnProperty('occasionId')) {
        if (occasion.state) {
          this.filtredPool.occasionId.push(occasion.occasionId);
        } else {
          this.filtredPool.occasionId = this.filtredPool.occasionId.filter(
            (element) => element !== occasion.occasionId
          );
        }
      } else if (occasion.hasOwnProperty('shapeId')) {
        if (occasion.state) {
          this.filtredPool.shapeId.push(occasion.shapeId);
        } else {
          this.filtredPool.shapeId = this.filtredPool.shapeId.filter(
            (element) => element !== occasion.shapeId
          );
        }
      } else if (occasion.hasOwnProperty('styleId')) {
        if (occasion.state) {
          this.filtredPool.styleId.push(occasion.styleId);
        } else {
          this.filtredPool.styleId = this.filtredPool.styleId.filter(
            (element) => element !== occasion.styleId
          );
        }
      }
      if (
        !this.filtredPool.shapeId.length &&
        !this.filtredPool.occasionId.length &&
        !this.filtredPool.styleId.length
      ) {
        this.cards = this.cardsPool;
      } else {
        this.cards = this.cardsPool.filter(
          (element) =>
            this.filtredPool.occasionId.includes(element.occasion) ||
            this.filtredPool.shapeId.includes(element.bodyShape) ||
            this.filtredPool.styleId.includes(element.personalStyle)
        );
      }
    });
  }

  isBrandPage() {
    return this.userType === UserTypes.Brand;
  }

  isUserPage() {
    return this.userType === UserTypes.User;
  }
  showStatusForm() {
    this.changingStatus = true;
  }

  submitStatus(value: string) {
    this.changingStatus = false;
    this.status = value;

    this.api
      .patchUserMe({
        status: this.status,
      })
      .subscribe();
  }

  isUser() {
    return this.type === UserTypes.User;
  }
  ngOnInit(): void {
    this.api
      .getOutfits({
        isPublic: true,
        id: this.id,
      })
      .subscribe((data: any) => {
        this.cards = data.data;
        this.cardsPool = this.cards;
        if (data.total > 6) this.hasMore = true;
      });
    this.api.getUserById(this.id).subscribe((data: any) => {
      if (data.type in UserTypes) {
        this.userType = data.type;
      }
      this.isOwner = this.api.currenUser['id'] === this.id;
      this.firstName = data['firstName'];
      this.lastName = data['lastName'];
      this.status = data['status'] || '';
      this.type = data['type'];
      this.authorThumbnail = data['thumbnailBrandData'];
    });
    
    this.api.getFollowers(this.id).subscribe((data: any) => this.notSubscribe = data.length ? false : true );
  }
  startSearching(): void {
    this.isSearched.emit(true);
    this.isSearching = true;
  }

  goToClothesBuilder(): void {
    this.router.navigate(['clothes-builder']);
  }

   toChanging(): void {
    this.isChanging = true;
  }

  saveChanges(): void {
    const form = new FormData();
    if (this.thumbnailUserData) {
      form.append('thumbnailBrandData', this.thumbnailUserData);
      this.isAuthorthubmnailLoaded = true;
    }
    this.api.patchUser(form).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully patched!', 'Success');
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

  editThumbnail(event): void {
    this.thumbnailUserData = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => (this.authorThumbnail = event.target.result);
    reader.readAsDataURL(this.thumbnailUserData);
    
    const form = new FormData();
    if (this.thumbnailUserData) {
      form.append('thumbnailBrandData', this.thumbnailUserData);
      this.isAuthorthubmnailLoaded = true;
    }
    this.api.patchUser(form).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully patched!', 'Success');
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
  }

  follow(): void {
      const form = new FormData();
      form.append('subId', this.id);
      this.api.follow({subId: this.id}).subscribe((data: any) => this.notSubscribe = false);
  }
  unSub(): void {
      this.api.unSubscribe(this.id).subscribe((data: any) => this.notSubscribe = true);
  }


}
