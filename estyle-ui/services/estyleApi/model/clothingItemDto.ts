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


export interface ClothingItemDto { 
    name: string;
    pictures: string;
    category: object;
    author: object;
    length: string;
    waistline: string;
    brand: string;
    occasions: string;
    tags: Array<string>;
    notes: string;
    isFavorite: boolean;
    price: number;
    createdOn: string;
}
