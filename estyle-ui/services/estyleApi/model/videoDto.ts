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


export interface VideoDto { 
    id: string;
    url: string;
    thumbnail?: string;
    title: string;
    description?: string;
    privacy?: string;
    transcript?: string;
    createdOn: string;
    updatedOn: string;
    isPrimary: boolean;
}
