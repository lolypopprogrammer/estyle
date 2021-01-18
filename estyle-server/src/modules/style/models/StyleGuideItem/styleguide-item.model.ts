import { Types } from 'mongoose';
import { StyleGuideItemAttribute } from './Attributes/styleguide-item-attribute.model';
import { HorizontalBodyShape } from '../quiz/measurements/measurements.enum';
import { ProminentFeature } from '../quiz/features/features.enum';

export class StyleGuideItem {
  constructor(
    public bodytype: HorizontalBodyShape[],
    public prominentFeature: ProminentFeature[],
    public clothingCategory: Types.ObjectId,
    public title: string,
    public description: string,
    public attributes: StyleGuideItemAttribute[],
    public createdOn: string,
    public isArchived: boolean,
    public readonly id?: Types.ObjectId,
  ) {}

  toObject() {
    return {
      id: this.id?.toString(),
      bodytype: this.bodytype,
      prominentFeature: this.prominentFeature,
      clothingCategory: this.clothingCategory?.toString(),
      title: this.title,
      description: this.description,
      attributes: this.attributes.map(attr => attr.toObject()),
      isArchived: this.isArchived,
    };
  }

  toJson() {
    return {
      id: this.id,
      bodytype: this.bodytype,
      prominentFeature: this.prominentFeature,
      clothingCategory: this.clothingCategory,
      title: this.title,
      description: this.description,
      attributes: this.attributes.map(attr => attr.toJson()),
      createdOn: this.createdOn,
    };
  }
}
