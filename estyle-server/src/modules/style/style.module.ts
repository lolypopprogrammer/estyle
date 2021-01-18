import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StyleGuideItemSchema } from './models/StyleGuideItem/styleguide-item.schema';
import { ClothingCategorySchema } from './models/ClothingCategory/clothing-category.schema';
import { ItemAttributeSchema } from './models/ItemAttribute/Attribute/item-attribute.schema';
import { ItemAttributeTypeSchema } from './models/ItemAttribute/Type/item-attribute-type.schema';
import { ItemAttributeController } from './controllers/item-attribute/item-attribute.controller';
import { ClothingCategoryController } from './controllers/clothing-category/clothing-category.controller';
import { StyleGuideItemController } from './controllers/styleguide-item/styleguide-item.controller';
import { QuizController } from './controllers/quiz/quiz.controller';
import { QuizSchema } from './models/quiz/quiz.schema';
import { BlobStorageService } from '../../common/services/blob-storage.service';
import { ClothingBrandController } from './controllers/clothing-brand/clothing-brand.controller';
import { ClothingBrandSchema } from './models/ClothingBrand/clothing-brand.schema';
import { ClothingItemController } from './controllers/clothing-item/clothing-item.controller';
import { ClothingItemSchema } from './models/ClothingItem/clothing-item.schema';
import { OutfitController } from './controllers/outfit/outfit.controller';
import { OutfitSchema } from './models/Outfit/outfit.schema';
import { CommentSchema } from './models/Comment/comment.schema';
import { ClothingOccasionSchema } from './models/ClothingOccasion/clothing-occasion.shema';
import { ClothingOccasionController } from './controllers/clothing-occasion/clothing-occasion.controller';
import { WardrobeCalendarSchema } from './models/WardrobeCalendar/wardrobe-calendar.schema';
import { WardrobeCalendarController } from './controllers/wardrobe-calendar/wardrobe-calendar.controller';
import { BrandCollectionController } from './controllers/brand-coolection/brand-collection.controller';
import { BrandCollectionSchema } from './models/BrandCollection/brand-collection.schema';
import {BodyShapeSchema} from './models/BodyShape/body-shape.schema';
import {BodyShapeController} from './controllers/body-shape/body-shape.controller';
import {PersonalStyleSchema} from './models/PersonalStyle/personal-style.schema';
import {PersonalStyleController} from './controllers/personal-style/personal-style.controller';
import { BrandItemSchema } from './models/BrandItem/brand-item.schema';
import { BrandItemController } from './controllers/brand-item/brand-item.controller';
import { FollowersController } from './controllers/followers/followers.controller';
import { FollowersSchema } from './models/Followers/followers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'StyleGuideItem', schema: StyleGuideItemSchema }]),
    MongooseModule.forFeature([{ name: 'ClothingCategory', schema: ClothingCategorySchema }]),
    MongooseModule.forFeature([{ name: 'ItemAttribute', schema: ItemAttributeSchema }]),
    MongooseModule.forFeature([{ name: 'ItemAttributeType', schema: ItemAttributeTypeSchema }]),
    MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }]),
    MongooseModule.forFeature([{ name: 'ClothingBrand', schema: ClothingBrandSchema }]),
    MongooseModule.forFeature([{ name: 'ClothingOccasion', schema: ClothingOccasionSchema }]),
    MongooseModule.forFeature([{ name: 'ClothingItem', schema: ClothingItemSchema }]),
    MongooseModule.forFeature([{ name: 'Outfit', schema: OutfitSchema }]),
    MongooseModule.forFeature([{ name: 'BrandCollection', schema: BrandCollectionSchema }]),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: 'WardrobeCalendar', schema: WardrobeCalendarSchema }]),
    MongooseModule.forFeature([{ name: 'BodyShape', schema: BodyShapeSchema }]),
    MongooseModule.forFeature([{ name: 'PersonalStyle', schema: PersonalStyleSchema }]),
    MongooseModule.forFeature([{ name: 'BrandItem', schema: BrandItemSchema }]),
    MongooseModule.forFeature([{ name: 'Followers', schema: FollowersSchema }]),
  ],
  controllers: [
    ItemAttributeController,
    ClothingCategoryController,
    StyleGuideItemController,
    QuizController,
    ClothingBrandController,
    ClothingItemController,
    OutfitController,
    ClothingOccasionController,
    WardrobeCalendarController,
    BodyShapeController,
    PersonalStyleController,
    BrandCollectionController,
    BrandItemController,
    FollowersController
  ],
  providers: [BlobStorageService],
})
export class StyleModule {}
