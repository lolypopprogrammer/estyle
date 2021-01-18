import { Types } from 'mongoose';

export class BrandCollection {
  constructor(
    public title: string,
    public color: string,
    public author: Types.ObjectId | any,
    public isArchived: boolean,
    public imageCollection?: string[],
    public readonly id?: Types.ObjectId,
  ) {}

  toObject() {
    return {
      id: this.id,
      title: this.title,
      color: this.color,
      imageCollection: this.imageCollection,
      author: this.author,
      isArchived: this.isArchived,
    };
  }

  toJson() {
    const origin = `${process.env.ORIGIN}:${process.env.PORT}`;
    return {
      id: this.id,
      title: this.title,
      color: this.color,
      imageCollection: this.imageCollection.map((picture) => `${origin}/${picture}`),
      author: this.author.id,
    };
  }
}
