import SearchModel from "../models/search.model";
import { ICreateSearchSchemaInput } from "../schemas/search-schema";

export const createSearchForm = async (form: ICreateSearchSchemaInput) => {
    const newForm = new SearchModel(form);
    return newForm.save();
}

export const getFormForGame = async (game: string) => {
    return SearchModel.findOne({game: game})
}