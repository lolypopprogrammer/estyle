import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthService } from './api/auth.service';
import { ClothingBrandsService } from './api/clothingBrands.service';
import { ClothingCategoryService } from './api/clothingCategory.service';
import { ClothingItemService } from './api/clothingItem.service';
import { ClothingOccasionService } from './api/clothingOccasion.service';
import { DefaultService } from './api/default.service';
import { ItemAttributeService } from './api/itemAttribute.service';
import { OutfitService } from './api/outfit.service';
import { PaymentService } from './api/payment.service';
import { PaymentPackageService } from './api/paymentPackage.service';
import { QuizService } from './api/quiz.service';
import { StyleGuideItemService } from './api/styleGuideItem.service';
import { UserService } from './api/user.service';
import { VideoService } from './api/video.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
