import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-brand-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class BrandPageMainComponent implements OnInit {
  @Input() id: string;
  @Input() isChanging: boolean;
  @Input() isBackgroundLoaded: boolean;
  @Input() isAuthorthubmnailLoaded: boolean;
  @Output() thumbnailBrandData: EventEmitter<any> = new EventEmitter();
  @Output() backgroundBrandData: EventEmitter<any> = new EventEmitter();

  firstName: string;
  lastName: string;
  userPhoto: string;
  status: string;
  isOwner: boolean = false;
  changingStatus: boolean = false;
  changingName: boolean = false;
  authorThumbnail: any;
  authorBackground: any;
  notSubscribe: boolean = true;
  isFollower: boolean = false;

  constructor(private api: ApiService) {}

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

  showNameForm(): void {
    this.changingName = true;
  }

  submitName(value: string): void {
    this.changingName = false;
    const splitName = value.split(' ');
    this.firstName = splitName[0];
    this.lastName = splitName[1];
    this.api
      .patchUserMe({
        firstName: this.firstName,
        lastName: this.lastName
      })
      .subscribe();
  }

  ngOnInit(): void {
    this.api.getUserById(this.id).subscribe((data: any) => {
      this.isOwner = this.api.currenUser['id'] === this.id;
      this.firstName = data['firstName'];
      this.lastName = data['lastName'];
      this.status = data['status'] || '';
      this.authorThumbnail =
        data['thumbnailBrandData'] || 'assets/images/ai.png';
      this.authorBackground =
        data['backgroundBrandData'] || 'assets/images/brandBg.jpg';
    });

    this.api.getFollowers(this.id).subscribe((data: any) => this.notSubscribe = data.length ? false : true );
  }
  editBackground(event): void {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => (this.authorBackground = event.target.result);
    reader.readAsDataURL(file);

    this.backgroundBrandData.emit(event);
  }
  editThumbnail(event): void {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => (this.authorThumbnail = event.target.result);
    reader.readAsDataURL(file);

    this.thumbnailBrandData.emit(event);
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
