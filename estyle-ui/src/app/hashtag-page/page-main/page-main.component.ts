import {Component, Input, OnInit} from "@angular/core";
import {ApiService} from "../../core/services/api/api.service";

enum UserTypes {
  'User' = 'User',
  'Brand' = 'Brand'
}

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss']
})
export class PageMainComponent implements OnInit {
  constructor(private api: ApiService) {
  }
  ngOnInit(): void {
  }
}
