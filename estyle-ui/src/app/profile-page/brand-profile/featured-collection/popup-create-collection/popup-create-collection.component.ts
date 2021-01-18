import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'popup-create-collection',
  templateUrl: './popup-create-collection.component.html',
  styleUrls: ['./popup-create-collection.component.scss'],
})
export class PopupCreateCollectionComponent implements OnInit {
  @Output() closePop: EventEmitter<any> = new EventEmitter();
  @Input() id;
  public formGroupCollection = new FormGroup({
    title: new FormControl(),
    color: new FormControl(),
  });

  picture: string | ArrayBuffer = './assets/images/1.png';
  pictureData: any;
  color: string;
  title: string;
  colorOptions: any;

  private subscription: Subscription;

  constructor(
    private readonly router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute
  ) {}
 
  ngOnInit() {
    this.colorOptions = ['light', 'dark'];
    if (this.id) {
      this.picture = './assets/gif/5.gif';
      this.api.getCollectionById(this.id).subscribe({
        next: (data: any) => {
          this.title = data.title;
          this.color = data.color;
          this.picture = data.imageCollection;
          this.formGroupCollection.setValue({
            color: this.color,
            title: this.title,
          });
          
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
  }

  closePopup(event): void {
    this.closePop.emit(event);
  }

  onBackgroundChange(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => (this.picture = event.target.result);
    reader.readAsDataURL(file);
  }

  onPictureSelected(e) {
    this.picture = URL.createObjectURL(e.target.files[0]);
    this.pictureData = e.target.files[0];
  }

  submit() {
    const { ...values } = this.formGroupCollection.value;
    const formatedForm = {
      ...values,
    };
    formatedForm.imageCollection = this.pictureData;
    const form = new FormData();
    for (const key in formatedForm) {
      form.append(key, formatedForm[key]);
    }
    this.picture = './assets/gif/5.gif';
    this.api.postCollection(form).subscribe({
      next: (data: any) => {
        this.picture = data.imageCollection;
        this.closePop.emit(true);
        this.toastr.success('Successfully patched!', 'Success');
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

  patch() {
    const { ...values } = this.formGroupCollection.value;
    const formatedForm = {
      ...values,
    };
    formatedForm.imageCollection = this.pictureData;
    const form = new FormData();
    for (const key in formatedForm) {
      form.append(key, formatedForm[key]);
    }
    this.picture = './assets/gif/5.gif';
    this.api.patchCollection(form, this.id).subscribe({
      next: (data: any) => {
        this.picture = data.imageCollection;
        this.closePop.emit(true);
        this.toastr.success('Successfully patched!', 'Success');
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

  delete(): void {
    this.api.deleteCollection(this.id).subscribe({
      next: (data: any) => {
        this.closePop.emit(true);
        this.toastr.success('Successfully deleted!', 'Success');
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
}
