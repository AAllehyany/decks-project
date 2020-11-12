import {DeckList, ICreateDeckInput} from '../schemas/deck_schema';


export const saveDeckService = async (deckList: ICreateDeckInput) => {

    const newDeck = new DeckList(deckList);
    return newDeck.save();
}

export const findByCode = async (code: string) => {
    return DeckList.findOne({code});
}

export const findListByCode = async (code: string) => {
    return DeckList.findOne({code}).populate('cards').exec();
}