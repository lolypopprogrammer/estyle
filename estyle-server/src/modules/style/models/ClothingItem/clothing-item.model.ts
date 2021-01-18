import { Types } from 'mongoose';

export class ClothingItem {
  constructor(
    public name: string,
    public pictures: string[],
    public category: Types.ObjectId | any,
    public author: Types.ObjectId | any,
    public length: string,
    public style: string,
    public lapels: string,
    public material: string,
    public neckline: string,
    public sleeves: string,
    public waistline: string,
    public brand: Types.ObjectId | any,
    public ocasions: string,
    public tags: string[],
    public notes: string,
    public isFavorite: boolean,
    public price: number,
    public createdOn: string,
    public isArchived: boolean,
    public readonly id?: Types.ObjectId,
  ) {}

  toObject() {
    return {
      id: this.id,
      name: this.name,
      pictures: this.pictures,
      category: this.category,
      author: this.author,
      length: this.length,
      style: this.style,
      lapels: this.lapels,
      material: this.material,
      neckline: this.neckline,
      sleeves: this.sleeves,
      waisline: this.waistline,
      brand: this.brand,
      ocasions: this.ocasions,
      tags: this.tags,
      notes: this.notes,
      isFavorite: this.isFavorite,
      price: this.price,
      isArchived: this.isArchived,
    };
  }

  toJson() {
    const origin = `${process.env.ORIGIN}:${process.env.PORT}`;
    return {
      id: this.id,
      name: this.name,
      pictures: this.pictures.map((picture) => `${origin}/${picture}`),
      category: this.category,
      author: this.author,
      length: this.length,
      style: this.style,
      lapels: this.lapels,
      material: this.material,
      neckline: this.neckline,
      sleeves: this.sleeves,
      waisline: this.waistline,
      brand: this.brand,
      ocasions: this.ocasions,
      tags: this.tags,
      notes: this.notes,
      isFavorite: this.isFavorite,
      price: this.price,
      createdOn: this.createdOn,
    };
  }
}
