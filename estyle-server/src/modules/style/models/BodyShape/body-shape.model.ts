import { Types } from 'mongoose';

export class BodyShape {
  constructor(
    public name: string,
    public createdOn: string,
    public isArchived: boolean,
    public readonly id?: Types.ObjectId,
  ) {}

  toObject() {
    return {
      id: this.id?.toString(),
      name: this.name,
      isArchived: this.isArchived,
    };
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      createdOn: this.createdOn,
    };
  }
}
