import { IPackageVariation } from "./variation.schema";
import { PackageVariation } from "./variation.model";
import { Types } from "mongoose";
import { ServiceFactory } from "../service/service.factory";

export class PackageVariationFactory {
  static create(data: Partial<IPackageVariation>) {
    const id = data._id || data.id;
    return new PackageVariation(
      data.name,
      data.price,
      data.interval,
      data.sku,
      data.services?.map(srv => ServiceFactory.create(srv)),
      data.isArchived || false,
      id && Types.ObjectId(id),
      data.createdOn,
    );
  }
}
