import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {Router, RouterEvent} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {filter} from "rxjs/operators";
import { Configuration } from 'services/estyleApi';
import { CurrentUserService } from './core/services/current-user/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'estyle-ui';

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private readonly configuration: Configuration,
    private readonly currentUser: CurrentUserService,
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof RouterEvent)
      )
      .subscribe((e: RouterEvent) => {
        if (e.url === '/style-guide') {
          // this.addStyleClassForHtml('--font-size-7');
          return;
        }

        // this.removeStyleClassForHtml('--font-size-7');
      });
  }

  ngOnInit() {
    const token = localStorage.getItem('estyleshaker-auth');
    if (!token) {
      return;
    }
    this.configuration.accessToken = token;
    this.currentUser.init();

  }

  addStyleClassForHtml(styleClass: string): void {
    const html = this.document.getElementsByTagName('html')[0];
    this.renderer.addClass(html, styleClass);
  }

  removeStyleClassForHtml(styleClass: string): void {
    const html = this.document.getElementsByTagName('html')[0];
    this.renderer.removeClass(html, styleClass);
  }
}
