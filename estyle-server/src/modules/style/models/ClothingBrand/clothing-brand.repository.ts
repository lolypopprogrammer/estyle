import { Model } from 'mongoose';
import { ClothingBrand } from './clothing-brand.model';
import { ClothingBrandFactory } from './clothing-brand.factory';
import { ClothingBrandInterface } from './clothing-brand.schema';

export class ClothingBrandRepository {
    constructor(
        private readonly ClothingBrandModel: Model<ClothingBrandInterface>
    ) {}

    async create(bodytype: ClothingBrand) {
        try {
            const type = new this.ClothingBrandModel(bodytype);
            const saved = await type.save();
            return ClothingBrandFactory.create(saved);
        } catch (err) {
            throw err;
        }
    }

    async update(bodytype: ClothingBrand) {
        try {
            const updated = await this.ClothingBrandModel.findOneAndUpdate(
                { _id: bodytype.id },
                { $set: bodytype.toObject() },
                { new: true }
            );
            return ClothingBrandFactory.create(updated);
        } catch (err) {
            throw err;
        }
    }

    async findById(id: string) {
        try {
            const found = await this.ClothingBrandModel.findOne({
                _id: id,
                isArchived: false,
            });
            return found && ClothingBrandFactory.create(found);
        } catch (err) {
            throw err;
        }
    }

    async find(where: any = {}) {
        try {
            const found = await this.ClothingBrandModel.find({
                ...where,
                isArchived: false,
            });
            return (
                found && found.map((type) => ClothingBrandFactory.create(type))
            );
        } catch (err) {
            throw err;
        }
    }
}
