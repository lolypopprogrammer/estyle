import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from './../../../core/services/api/api.service';
import {ToastrService} from 'ngx-toastr';
import { Configuration } from 'services/estyleApi';
import { CurrentUserService } from 'src/app/core/services/current-user/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private readonly router: Router,
    private readonly currentUser: CurrentUserService,
    private api: ApiService,
    private toastr: ToastrService,
    private configuration: Configuration,
  ) {}

  login() {
    this.api
      .login({ ...this.formGroup.value, email: this.formGroup.value.username })
      .subscribe({
        next: (data: any) => {
          this.api.setUser(data.user);
          this.api.setToken(data.token);
          this.configuration.accessToken = data.token;
          this.currentUser.init();
          this.router.navigate(['/']);
          this.toastr.info(`Welcome, ${data.user.firstName}!`, 'Hi!');
        },
        error: ({ error }) => {
          this.toastr.error(`something is wrong`, 'Error');
        },
      });
  }
}
