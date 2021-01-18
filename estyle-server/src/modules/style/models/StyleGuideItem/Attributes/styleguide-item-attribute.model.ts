import { Types } from 'mongoose';
import { AttributeType } from 'src/modules/style/controllers/styleguide-item/dto/styleguide-item-attribute-type.enum';

export class StyleGuideItemAttribute {
  constructor(
    public attribute: Types.ObjectId,
    public description: string,
    public type: AttributeType,
    public createdOn: string,
    public isArchived: boolean,
    public picture?: string,
    public readonly id?: Types.ObjectId,
  ) {}

  toObject() {
    return {
      id: this.id?.toString(),
      attribute: this.attribute.toString(),
      type: this.type,
      description: this.description,
      picture: this.picture,
      isArchived: this.isArchived,
    };
  }

  toJson() {
    return {
      id: this.id,
      attribute: this.attribute,
      type: this.type,
      description: this.description,
      picture: this.picture,
      createdOn: this.createdOn,
    };
  }
}
