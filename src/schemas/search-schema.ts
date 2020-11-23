import {ISearch} from '../models/search.model';

export interface SearchSchema {
    name?: string,
    card_type?: number,
    color?: number,
    soul?: number,
    min_cost?: number,
    max_cost?: number,
    min_level?: number,
    max_level?: number,
    min_power?: number,
    max_power?: number,
    level_limit?: number,
    game: string,
    skip?: number,
    limit?: number,
    title_code?: string,
}

export interface ICreateSearchSchemaInput {
    game: ISearch['game']
    fields: ISearch['fields']
}