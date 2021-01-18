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


export interface StyleGuideItemAttributeDto { 
    id: string;
    attribute: string;
    picture?: string;
    type: StyleGuideItemAttributeDto.TypeEnum;
    description: string;
}
export namespace StyleGuideItemAttributeDto {
    export type TypeEnum = 'recommend' | 'avoid';
    export const TypeEnum = {
        Recommend: 'recommend' as TypeEnum,
        Avoid: 'avoid' as TypeEnum
    };
}


