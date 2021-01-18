import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';

@Component({
  selector: 'app-comment-component',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {
  @Input() comment: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {

  }

  Date(createdOn: any) {
    let date = new Date(createdOn);
    return date.toLocaleDateString();
  }
}
