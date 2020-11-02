import {WeissCard} from '../schemas/weiss-card.schema';


export const validateWeissDeck = (deckList: Array<WeissCard>): boolean => {
    // if(deckList.length != 50) 
    //     return false;
    
    const numClimaxes = deckList.reduce((p: number, c): number => c.card_type == 2 ? (p + 1) : p, 0);
    if(numClimaxes > 8) {
        return false;
    }

    const nameCopies = {} as any;
    for(const card of deckList){

        if(nameCopies[card.name] === undefined) {
            nameCopies[card.name] = 0;
        }

        nameCopies[card.name] += 1;

        if(nameCopies[card.name] > 4) {
            return false
        }
    }

    return true;
}