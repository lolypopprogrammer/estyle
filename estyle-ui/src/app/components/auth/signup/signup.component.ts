import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { Configuration } from 'services/estyleApi';

import { ApiService } from './../../../core/services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
      private readonly router: Router,
      private api: ApiService,
      private toastr: ToastrService,
      private configuration: Configuration,
  ) {}

  formGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  signup() {
    this.api.signup(this.formGroup.value).subscribe({
      next: (data: any) => {
        this.api.setUser(data.user);
        this.api.setToken(data.token);
        this.configuration.accessToken = data.token;
        this.router.navigate(['/']);
        this.toastr.info(`Welcome, ${data.user.firstName}!`, 'Hi!');
      },
      error: ({ error }) => {
        this.toastr.error(`something is wrong`, 'Error');
      },
    });
  }
}
