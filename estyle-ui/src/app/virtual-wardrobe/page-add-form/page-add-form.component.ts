import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../core/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-page-add-form',
  templateUrl: './page-add-form.component.html',
  styleUrls: ['./page-add-form.component.scss'],
})
export class PageAddFormComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl(),
    category: new FormControl(),
    brand: new FormControl(),
    ocasions: new FormControl(),
    tags: new FormControl(),
    notes: new FormControl(),
  });

  brands: any = ['test'];
  occasions: any = [];
  categories: any = [];
  brandOptions: any = ['test'];
  occasionOptions: any = [];
  categoryOptions: any = [];

  userRole: string;

  targetCategory: string;

  attributeList: any = [];

  picture: string | ArrayBuffer = './assets/images/mock/clothes/3.png';
  pictureData: any;
  id: string;
  name: string;
  length: string;
  notes: string;
  tags: any;
  category: string;
  brand: string;
  occasion: string;

  private subscription: Subscription;

  constructor(
    private readonly router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute
  ) {
    this.subscription = activateRoute.params.subscribe(
      (params) => (this.id = params['id'])
    );
    if (this.id) {
      this.api.getClothingItemsById(this.id).subscribe((data: any) => {
        if (data['author']['id'] != this.api.currenUser.id) {
          this.router.navigate([`add`], { relativeTo: this.activateRoute });
        } else {
          this.name = data.name;
          this.length = data.length;
          this.notes = data.notes;
          this.tags = data.tags.join(' ');
          this.picture = data.pictures[0];
          this.category = data.category.name;
          this.brand = data.brand.name;
          this.occasion = data.ocasions;
          this.formGroup.setValue({
            name: this.name,
            category: this.category,
            length: this.length,
            notes: this.notes,
            tags: this.tags,
            waistline: '',
            brand: this.brand,
            ocasions: this.occasion,
          });
        }
      });
    }
  }

  ngOnInit() {
    this.userRole = this.api.currenUser.type;
    if (this.userRole == 'BrandEditor') {
      this.formGroup.addControl('price', new FormControl());
      this.formGroup.addControl('link', new FormControl());
    }
    this.api.getCategories().subscribe((data: any) => {
      this.categories = data;
      this.categoryOptions = data.map(({ name }) => name);
    });
    this.api.getBrands().subscribe((data: any) => {
      this.brands = data;
      this.brandOptions = data.map(({ name }) => name).sort();
    });
    this.api.getOccasions().subscribe((data: any) => {
      this.occasions = data;
      this.occasionOptions = data.map(({ name }) => name);
    });
  }

  onBackgroundChange(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => (this.picture = event.target.result);
    reader.readAsDataURL(file);
  }

  goBack() {
    this.router.navigate(['/virtual-wardrobe']);
  }

  onPictureSelected(e) {
    this.picture = URL.createObjectURL(e.target.files[0]);
    this.pictureData = e.target.files[0];
  }

  getAttribute(e) {
    this.targetCategory = this.categories.filter(
      (element) => element.name == e.target.value
    )[0];
    this.attributeList = [];
    this.targetCategory['attributeTypes'].forEach((element, index) => {
      this.attributeList[index] = {};
      this.api.getTypeAttribute(element).subscribe((data: any) => {
        this.attributeList[index]['name'] = data.name;
        this.formGroup.addControl(data.name.toLowerCase(), new FormControl());
        this.api.getAttributeByType(data.id).subscribe((data: any) => {
          this.attributeList[index]['attribute'] = data.map(
            (item) => item.name
          );
        });
      });
    });
  }

  submitBrand() {
    const {
      ...values
    } = this.formGroup.value;
    const formatedForm = {
      ...values,
    };
    if (!this.id) {
      formatedForm.picture = this.pictureData;
    }
    const form = new FormData();
    for (const key in formatedForm) {
      form.append(key, formatedForm[key]);
    }
    
    this.api.createBrandItem(form).subscribe({
    next: (data: any) => {
        this.router.navigate([`virtual-wardrobe`]);
        this.toastr.success('Successfully created!', 'Success');
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

  submit() {
    const {
      tags,
      category,
      brand,
      occasions,
      ...values
    } = this.formGroup.value;
    const formatedForm = {
      ...values,
      brand: this.brands.find((x) => x.name === brand)?.id,
      category: this.categories.find((x) => x.name === category)?.id,
      occasions: this.occasions.find((x) => x.name === occasions)?.id,
    };
    if (!this.id) {
      formatedForm.picture = this.pictureData;
    }
    const form = new FormData();
    for (const key in formatedForm) {
      form.append(key, formatedForm[key]);
    }
    if (tags) {
      const tagsWithSymbol = this.formGroup
        .get('tags')
        .value.map((tag) => '#' + tag);
      form.append('tags', JSON.stringify(tagsWithSymbol));
    }
    if (this.id) {
      this.api.patchClothingItem(this.id, form).subscribe({
        next: (data: any) => {
          this.router.navigate([`virtual-wardrobe`]);
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
    } else {
      this.api.createClothingItem(form).subscribe({
        next: (data: any) => {
          this.router.navigate([`virtual-wardrobe`]);
          this.toastr.success('Successfully created!', 'Success');
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
}
