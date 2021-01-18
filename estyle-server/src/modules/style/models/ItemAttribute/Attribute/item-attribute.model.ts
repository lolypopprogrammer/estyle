import { Types } from 'mongoose';

export class ItemAttribute {
  constructor(
    public name: string,
    public type: Types.ObjectId,
    public pictures: string[],
    public createdOn: string,
    public isArchived: boolean,
    public readonly id?: Types.ObjectId,
  ) {}

  toObject() {
    return {
      id: this.id?.toString(),
      name: this.name,
      type: this.type,
      pictures: this.pictures,
      isArchived: this.isArchived,
    };
  }

  toJson() {
    return {
      id: this.id?.toString(),
      name: this.name,
      type: this.type.toString(),
      pictures: this.pictures,
      createdOn: this.createdOn,
    };
  }
}
