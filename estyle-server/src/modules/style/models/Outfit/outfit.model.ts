import { Types } from 'mongoose';

export class Outfit {
  constructor(
    public name: string,
    public pictures: string[],
    public createdOn: string,
    public isArchived: boolean,
    public isPublic: boolean,
    public isLookbook: boolean,
    public description: string,
    public tags: string[],
    public author: Types.ObjectId | any,
    public structure: string | any,
    public likes: Types.ObjectId[] | any[],
    public views: Types.ObjectId[] | any[],
    public comments: Types.ObjectId[] | any[],
    public brands: Types.ObjectId[] | any[],
    public items: Types.ObjectId[] | any[],
    public bodyShape: Types.ObjectId | any,
    public personalStyle: Types.ObjectId | any,
    public occasion: Types.ObjectId | any,
    public brandCollection: Types.ObjectId | any,
    public readonly id?: Types.ObjectId,
  ) {}

  toObject() {
    return {
      id: this.id,
      name: this.name,
      pictures: this.pictures,
      isArchived: this.isArchived,
      author: this.author,
      structure: this.structure,
      description: this.description,
      tags: this.tags,
      isPublic: this.isPublic,
      isLookbook: this.isLookbook,
      likes: this.likes,
      views: this.views,
      comments: this.comments,
      brands: this.brands,
      items: this.items,
      bodyShape: this.bodyShape,
      personalStyle: this.personalStyle,
      occasion: this.occasion,
      brandCollection: this.brandCollection,
    };
  }

  toJson() {
    const origin = `${process.env.ORIGIN}:${process.env.PORT}`;
    return {
      id: this.id,
      name: this.name,
      pictures: this.pictures.map((picture) => `${origin}/${picture}`),
      createdOn: this.createdOn,
      author: {
        fullname: `${this.author?.firstName} ${this.author?.lastName}`,
        role: this.author?.role,
        id: this.author.id,
        email: this.author.email,
        backgroundBrandData: this.author.backgroundBrandData ? this.author.backgroundBrandData.map((picture) => `${origin}/${picture}`) : ''
      },
      structure: this.structure,
      description: this.description,
      tags: this.tags,
      likes: this.likes,
      views: this.views,
      isPublic: this.isPublic,
      isLookbook: this.isLookbook,
      comments: this.comments,
      brands: this.brands,
      items: this.items,
      bodyShape: this.bodyShape,
      personalStyle: this.personalStyle,
      occasion: this.occasion,
      brandCollection: this.brandCollection,
    };
  }
}
