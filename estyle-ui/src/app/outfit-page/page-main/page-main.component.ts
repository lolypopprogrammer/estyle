import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class PageMainComponent implements OnInit {
  @Input() id: string;
  author: string;
  comments: string;
  likes: string;
  authorThumbnail: string;
  name: string;
  href: string;
  color = 'light';
  image: any = '';
  isOwner: boolean = false;
  description: string;
  descriptionPost: string;
  brandItem: any = [];
  tags: any;
  tagOut: string;
  formOpened: boolean = false;
  formGroup = new FormGroup({
    tag: new FormControl()
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.api.getOutfitById(this.id).subscribe( (data: any) => {
      this.image = data['pictures'][0];
      this.name = data['name'];
      this.author = data['author']['fullname'];
      this.likes = data['likes'];
      this.comments = data['comments'].length;
      this.isOwner = this.api.isOwner(data['author']['id']) || this.api.currenUser['type'] == 'Stylist';
      this.description = data['description'];
      const items = this.jsonPipeItems(data.items);
      this.tags = this.jsonPipeTag(data.tags);
      items.forEach((element) => this.api.getBrandItemById(element).subscribe((data) => data ? this.brandItem.push(data) : 0));

    });
  }

  jsonPipeTag(array: any): any {
    return array.join("").replace(/[\[\]']+/g, '').replace(/"/g, '').split('#').filter((e) => e).map((e) => '#' + e);       
  }
  jsonPipeItems(array: any): any {
    return array.join("").replace(/[\[\]']+/g, '').replace(/"/g, '').split(',');       
  }

  patch(): void {
    this.router.navigate([`/clothes-builder/${this.id}`]);
  }

  save(descriptionPost): void {
    const form = new FormData();
    form.append('description', descriptionPost);
    this.api.patchOutfit(this.id, form).subscribe((data) => {
      this.toastr.success(`Description saved successfully`, 'Success!');
    });
  }

  openForm(): void {
    this.formOpened = true;
  }

  addHashtag(): void {
    const form = new FormData();
    const tagsWithSymbol = '#' + this.formGroup
    .get('tag')
    .value;

    form.append('tags', tagsWithSymbol);
    this.api.patchOutfit(this.id, form).subscribe((data: any) => this.tags = this.jsonPipeTag(data.tags));
    this.formOpened = false;
  }

  toHashtagPage(event): void {
    this.router.navigate([`/hashtag-page/${event.target.value}`]);
  }
}
