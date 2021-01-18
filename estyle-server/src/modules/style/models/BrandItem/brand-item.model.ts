import { Types } from 'mongoose';

export class BrandItem {
  constructor(
    public name: string,
    public pictures: string[],
    public brand: string,
    public link: string,    
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
      brand: this.brand,
      link: this.link,
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
      brand: this.brand,
      link: this.link,      
      price: this.price,
      createdOn: this.createdOn,
    };
  }
}
