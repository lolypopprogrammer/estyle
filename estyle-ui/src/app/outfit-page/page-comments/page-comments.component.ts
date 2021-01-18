import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../core/services/api/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-page-comments',
  templateUrl: './page-comments.component.html',
  styleUrls: ['./page-comments.component.scss']
})

export class PageCommentsComponent implements OnInit {
  @Input() id: string;
  comments: any = [];
  comment: string = '';
  constructor(
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.api.getOutfitById(this.id).subscribe( (data) => {
      this.comments = data['comments'];
      this.sortComment();
      this.isOwnerComment();
    });
  }
  
  submit(comment):void {
    this.api
      .postComment(this.id, {'content': comment})
      .subscribe( (data) => {
        this.comments.push(data['comments'][[data['comments'].length - 1]]);
        let comment = document.querySelector('#comment');
        // @ts-ignore
        comment.value = ''
        this.toastr.success(`comment posted successfully`, 'Success!');
        this.sortComment();
        this.isOwnerComment();
      });
  }

  isOwnerComment(): void {
    this.comments.forEach((comment) => {
      this.api.isOwner(comment.author.id) ? comment.isOwner = true : comment.isOwner = false;
    });
  }

  sortComment(): void {
    this.comments.sort( (a, b) => b['createdOn'] >= a['createdOn'] ? 1 : -1);
  }

}
