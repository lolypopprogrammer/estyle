import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../../../core/services/api/api.service';
import {Router, ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {

  token: string;
  private subscription: Subscription;

  constructor(
      private readonly router: Router,
      private api: ApiService,
      private activateRoute: ActivatedRoute,
      private toastr: ToastrService
  ) {
    this.subscription = activateRoute.params
      .subscribe(params=>this.token=params['token']);
  }

  newPasswordControl = new FormControl();

  resetPassword() {
    this.api
      .resetPassword({token: this.token, password: this.newPasswordControl.value})
      .subscribe(
        {
          next: (data: any) => {
            this.toastr.success(`Password changed successfully`, 'success');
            this.router.navigate(['/']);
          },
          error: ({error}) => {
            this.toastr.error(`something is wrong`, 'Error');
          },
        }
      );
  }
}
