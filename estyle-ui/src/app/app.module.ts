import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiModule, BASE_PATH, Configuration } from 'services/estyleApi';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { StyleAvenueComponent } from './pages/style-avenue/style-avenue.component';
import { AvenueCardComponent } from './pages/style-avenue/avenue-card/avenue-card.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { InputFieldComponent } from './components/common/input-field/input-field.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForgotComponent } from './components/auth/forgot/forgot.component';
import { LayoutRootModule } from './layout-root/layout-root.module';
import { CoreModule } from './core/core.module';
import { ResetComponent } from './components/auth/reset/reset.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VimeoService } from './core/services/vimeo/vimeo.service';
import { NguCarouselModule } from '@ngu/carousel';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchPanelComponent } from './ui/search-panel/search-panel.component';
import { SearchPanelModule } from './ui/search-panel/search-panel.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {NewsletterModule} from "./components/newsletter/newsletter.module";
import {SharedModule} from "./shared/shared.module";
import {ScrollToModule} from "@nicky-lenaers/ngx-scroll-to";
import {JwtInterceptor} from "@app/auth/jwt.interceptor";
import { environment } from '../environments/environment';
import { AuthInterceptor } from './auth-interceptor';
import { CurrentUserService } from './core/services/current-user/current-user.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    StyleAvenueComponent,
    AvenueCardComponent,
    AuthComponent,
    LoginComponent,
    InputFieldComponent,
    SignupComponent,
    ForgotComponent,
    ResetComponent,
    // SearchPanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRootModule,
    CoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    SearchPanelModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NguCarouselModule,
    SearchPanelModule,
    CoreModule,
    NewsletterModule,
    SharedModule,
    ScrollToModule.forRoot(),
    SharedModule,
    {
      ngModule: ApiModule,
      providers: [
        {
          provide: BASE_PATH,
          useValue: `${environment.apiUrl}`
        },
      ],
    },
  ],
  providers: [
    VimeoService,
/*    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },*/
    VimeoService,
    CurrentUserService,
    {
      provide: Configuration,
      useValue: new Configuration({}),
      multi: false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
