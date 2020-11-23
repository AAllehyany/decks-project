import GameModel from '../models/game.model';
import searchModel from '../models/search.model';
import {ICreateGameInput} from '../schemas/game_schema';


export const createGame = async (game: ICreateGameInput) => {
    const newGame = new GameModel(game);
    return newGame.save();
}

export const getAllGames = async () => {
    return GameModel.find();
}

export const getGameAndForm = async (code: string) => {
    const game = await GameModel.findOne({code});
    const form = await searchModel.findOne({game: game?.code});

    return {
        game,
        form
    }
}