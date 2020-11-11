import ExpansionModel from '../models/expansion.model';
import { ICreateExpansionInput } from '../schemas/expansion_schema';


export const createExpansion = async (game: ICreateExpansionInput) => {
    const newExpansion = new ExpansionModel(game);
    return newExpansion.save();
}

export const getAllExpansions = async () => {
    return ExpansionModel.find();
}
