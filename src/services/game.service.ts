import GameModel from '../models/game.model';
import {ICreateGameInput} from '../schemas/game_schema';


export const createGame = async (game: ICreateGameInput) => {
    const newGame = new GameModel(game);
    return newGame.save();
}

export const getAllGames = async () => {
    return GameModel.find();
}
