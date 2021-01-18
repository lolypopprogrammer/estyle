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
  @Input() id: string;
  firstName: string
  lastName: string
  userPhoto: string
  status: string;
  @Input() type: String
  isOwner: boolean = false
  changingStatus: boolean = false

  constructor(private api: ApiService) {
  }

  showStatusForm() {
    this.changingStatus = true;
  }

  submitStatus(value: string) {
    this.changingStatus = false;
    this.status = value;

    this.api.patchUserMe({
      status: this.status
    }).subscribe();
  }

  isUser() {
    return this.type === UserTypes.User;
  }

  ngOnInit(): void {
    this.api.getUserById(this.id).subscribe((data) => {
      this.isOwner = this.api.currenUser['id'] === this.id;
      this.firstName = data['firstName'];
      this.lastName = data['lastName'];
      this.status = data['status'] || '';
      this.type = data['type'];
    });
  }

}
