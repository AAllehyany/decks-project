import {DeckList} from '../schemas/deck_schema';

export interface DeckListInput {
    name: string,
    code: string,
    game: string,
    cards: Array<any>
}

export const saveDeckService = async (deckList: DeckListInput) => {

    const newDeck = new DeckList(deckList);
    return newDeck.save();
}

export const findByCode = async (code: string) => {
    return DeckList.findOne({code});
}

export const findListByCode = async (code: string) => {
    return DeckList.findOne({code}).select('cards').populate('cards').exec();
}