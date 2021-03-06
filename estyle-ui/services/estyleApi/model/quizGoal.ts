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


export interface QuizGoal { 
    styleGoal: Array<QuizGoal.StyleGoalEnum>;
    lookGoal: Array<QuizGoal.LookGoalEnum>;
    dressGoal: Array<QuizGoal.DressGoalEnum>;
    knowledgeGoal: Array<QuizGoal.KnowledgeGoalEnum>;
    howToGoal: Array<QuizGoal.HowToGoalEnum>;
}
export namespace QuizGoal {
    export type StyleGoalEnum = 'confidence' | 'wardrobe';
    export const StyleGoalEnum = {
        Confidence: 'confidence' as StyleGoalEnum,
        Wardrobe: 'wardrobe' as StyleGoalEnum
    };
    export type LookGoalEnum = 'younger' | 'slimmer';
    export const LookGoalEnum = {
        Younger: 'younger' as LookGoalEnum,
        Slimmer: 'slimmer' as LookGoalEnum
    };
    export type DressGoalEnum = 'age' | 'occasion' | 'personality' | 'job';
    export const DressGoalEnum = {
        Age: 'age' as DressGoalEnum,
        Occasion: 'occasion' as DressGoalEnum,
        Personality: 'personality' as DressGoalEnum,
        Job: 'job' as DressGoalEnum
    };
    export type KnowledgeGoalEnum = 'colors';
    export const KnowledgeGoalEnum = {
        Colors: 'colors' as KnowledgeGoalEnum
    };
    export type HowToGoalEnum = 'matchColors' | 'accessorize';
    export const HowToGoalEnum = {
        MatchColors: 'matchColors' as HowToGoalEnum,
        Accessorize: 'accessorize' as HowToGoalEnum
    };
}


