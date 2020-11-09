import { DeckRule } from '../schemas/deck-rule.schema';
import {WeissCard} from '../schemas/weiss-card.schema';


export const weissRules: Array<DeckRule> = [
    {targetField: {field: "name", value: 'group'}, rule: {max: 4, min: 0}},
    {targetField: {field: "card_type", value: 2}, rule: {max: 8, min: 0}},
    {targetField: {field: "deck", value: 'length'}, rule: {max: 50, min: 50}}
];

export const validateWithRule = (deckList: Array<any>, rules: Array<DeckRule>): Boolean => {

    for(const rule of rules) {
        const field = rule.targetField;
        if(<string>field.value === 'group') {
            const grouped = {} as any;
            for(const card of deckList) {
                if(grouped[card[field.field]] === undefined) {
                    grouped[card[field.field]] = 0;
                }
        
                grouped[card[field.field]] += 1;
        
                if(grouped[card[field.field]] > rule.rule.max || grouped[card[field.field]] < rule.rule.min) {
                    return false
                }
            }
        } else if(<string>field.value === 'length') {
            if(deckList.length > rule.rule.max || deckList.length < rule.rule.min) return false; 
        } else {
            const filtered = deckList.reduce((p, c) => c[field.field] === field.value ? (p + 1) : p, 0);
            if(filtered > rule.rule.max || filtered < rule.rule.min) return false;
        }
    }

    return true;
};

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