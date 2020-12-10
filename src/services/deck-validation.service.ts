import { DeckRule, DeckBuildRule, RuleTypes } from '../schemas/deck-rule.schema';
import {WeissCard} from '../schemas/weiss-card.schema';


export const weissRules: Array<DeckRule> = [
    {targetField: {field: "name", value: 'group'}, rule: {max: 4, min: 0}},
    {targetField: {field: "card_type", value: 2}, rule: {max: 8, min: 0}},
    {targetField: {field: "deck", value: 'length'}, rule: {max: 50, min: 50}}
];

export const weissDeckRules: Array<DeckBuildRule> = [
    {field: "name", value: "", min: 0, max: 4, group: false, check: RuleTypes.MAX_COPIES},
    {field: "deck", value: "", min: 50, max: 50, group: false, check: RuleTypes.DECK_SIZE},
    {field: "card_type", value: 2, min: 0, max: 8, group: false, check: RuleTypes.DECK_SIZE},
]


export const validateRule = (list: Array<any>, rules: [DeckBuildRule]): Boolean =>{
    for(const rule of rules) {
      if(rule.check === RuleTypes.MAX_COPIES) {
        const grouped = {} as any;
        for(const card of list) {
            if(grouped[card[rule.field]] === undefined) {
                grouped[card[rule.field]] = 0;
            }
    
            grouped[card[rule.field]] += 1;
    
            if(grouped[card[rule.field]] > rule.max || grouped[card[rule.field]] < rule.min) {
                return false
            }
        }
      } else if(rule.check === RuleTypes.DECK_SIZE) {
        if(list.length > rule.max || list.length < rule.min) return false;
      } else {
        const filtered = list.reduce((p, c) => c[rule.field] === rule.value ? (p + 1) : p, 0);
        if(filtered > rule.max || filtered < rule.min) return false;
      }
    }
    return true;
}

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