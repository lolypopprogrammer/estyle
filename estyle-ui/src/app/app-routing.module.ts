import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StyleAvenueComponent } from './pages/style-avenue/style-avenue.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForgotComponent } from './components/auth/forgot/forgot.component';
import { LayoutRootComponent } from './layout-root/layout-root/layout-root.component';
import { ResetComponent } from './components/auth/reset/reset.component';
import { AuthGuard } from '../app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StyleAvenueComponent,
  },
  {
    path: 'payment/canceled',
    redirectTo: 'payment-status/error'
  },
  {
    path: 'payment/success',
    redirectTo: 'payment-status/success'
  },
  {
    path: 'account',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/account/login',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignupComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotComponent,
      },
      {
        path: 'reset/:token',
        component: ResetComponent,
      },
    ],
  },
  {
    path: 'clothes-builder',
    component: LayoutRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./clothes-builder/clothes-builder.module').then(
            (m) => m.ClothesBuilderModule
          ),
      },
    ],
  },
  {
    path: 'clothes-builder/:id',
    component: LayoutRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./clothes-builder/clothes-builder.module').then(
            (m) => m.ClothesBuilderModule
          ),
      },
    ],
  },
  {
    path: 'style-guide',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./style-guide/style-guide.module').then(
            (m) => m.StyleGuideModule
          ),
      },
    ],
  },
  {
    path: 'quiz',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./quiz/quiz.module').then((m) => m.QuizModule),
      },
    ],
  },
  {
    path: 'virtual-wardrobe',
    component: LayoutRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./virtual-wardrobe/virtual-wardrobe.module').then(
            (m) => m.VirtualWardrobeModule
          ),
      },
    ],
  },
  {
    path: 'style-and-play',
    component: LayoutRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./style-and-play/style-and-play.module').then(
            (m) => m.StyleAndPlayModule
          ),
      },
    ],
  },
  {
    path: 'outfit-page/:id',
    component: LayoutRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./outfit-page/outfit-page.module').then(
            (m) => m.OutfitPageModule
          ),
      },
    ],
  },
  {
    path: 'profile-page/:id',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./profile-page/profile-page.module').then(
            (m) => m.ProfilePageModule
          ),
      },
    ],
  },
  {
    path: 'hashtag-page/:name',
    component: LayoutRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./hashtag-page/hashtag-page.module').then(
            (m) => m.HashtagPageModule
          ),
      },
    ],
  },

  {
    path: '404',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/thank-you/thank-you.module').then(
            (m) => m.ThankYouModule
          ),
      },
    ],
  },
  {
    path: 'price-list',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/price-list/price-list.module').then(
            (m) => m.PriceListModule
          ),
      },
    ],
  },
  {
    path: 'one-to-one-session',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/one-to-one-session/one-to-one-session.module').then(
            (m) => m.OneToOneSessionModule
          ),
      },
    ],
  },
  {
    path: 'online-stylist',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/online-stylist/online-stylist.module').then(m => m.OnlineStylistModule)
      }
    ]
  },
  {
    path: 'video-channel',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/video-channel/video-channel.module').then(m => m.VideoChannelModule)
      }
    ]
  },
//   {
//     path: 'account',
//     // component: LayoutRootComponent,
//     children: [
//       {
//         path: 'settings',
//         loadChildren: () => import('./account/account-settings/account-settings.module').then(m => m.AccountSettingsModule)
//       }
//     ]
//   },

  {
    path: 'wish-list',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./wish-list/wish-list.module').then(m => m.WishListModule)
      }
    ]
  },
  {
    path: 'payment-status',

    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/payment-status/payment-status.module').then(m => m.PaymentStatusModule)
      }
    ]
  },
  {
    path: '404',
    component: LayoutRootComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [32, 256],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
