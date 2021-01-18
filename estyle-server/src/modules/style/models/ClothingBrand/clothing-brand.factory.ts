import { Types } from 'mongoose';
import { ClothingBrand } from './clothing-brand.model';

export class ClothingBrandFactory {
    static create(data?: any): ClothingBrand {
        return new ClothingBrand(
            data.name,
            data.createdOn,
            data.isArchived || false,
            data._id && Types.ObjectId(data._id.toString())
        );
    }
}
