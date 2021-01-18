import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from './../../../core/services/api/api.service';
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  constructor(
      private readonly router: Router,
      private api: ApiService,
      private toastr: ToastrService
  ) {}

  emailControl = new FormControl();

  forgotPassword() {
    this.api
      .forgotPassword({email: this.emailControl.value})
      .subscribe(
        {
          next: (data: any) => {
            this.toastr.success(`Check your mailbox`, 'success');
            this.router.navigate(['/']);
          },
          error: ({error}) => {
            this.toastr.error(`something is wrong`, 'Error');
          },
        }
      );
  }
}
