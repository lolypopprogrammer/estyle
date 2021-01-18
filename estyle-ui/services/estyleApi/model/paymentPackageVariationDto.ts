/**
 * eStyle server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Service } from './service';


export interface PaymentPackageVariationDto { 
    name: string;
    /**
     * Should be sent rounded to 2 decimal points
     */
    price: string;
    interval: PaymentPackageVariationDto.IntervalEnum;
    sku: string;
    services: Array<Service>;
}
export namespace PaymentPackageVariationDto {
    export type IntervalEnum = 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    export const IntervalEnum = {
        MONTHLY: 'MONTHLY' as IntervalEnum,
        QUARTERLY: 'QUARTERLY' as IntervalEnum,
        YEARLY: 'YEARLY' as IntervalEnum
    };
}

