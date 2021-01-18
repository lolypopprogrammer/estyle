import { Types } from 'mongoose';

export class ClothingCategory {
  constructor(
    public name: string,
    public attributeTypes: Types.ObjectId[],
    public createdOn: string,
    public isArchived: boolean,
    public readonly id?: Types.ObjectId,
  ) {}

  toObject() {
    return {
      id: this.id?.toString(),
      attributeTypes: this.attributeTypes,
      name: this.name,
      isArchived: this.isArchived,
    };
  }

  toJson() {
    return {
      id: this.id.toString(),
      attributeTypes: this.attributeTypes,
      name: this.name,
      createdOn: this.createdOn,
    };
  }
}
