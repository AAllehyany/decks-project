import * as deckService from '../services/decks.service';
import {createDeckSchema, ICreateDeckInput} from '../schemas/deck_schema';
import {generateUniqueCode} from '../services/code-generation.service';
import {fetchCards} from '../services/cards.service';
import {weissRules, validateWithRule} from '../services/deck-validation.service';


import Router from '@koa/router';
import { WeissCard } from '../schemas/weiss-card.schema';

const router = new Router({
    prefix: '/decks'
});

router.post('/save', async ctx => {

    const deck: ICreateDeckInput = ctx.request.body;
    

    await createDeckSchema.validateAsync(deck);

    const deckList = await fetchCards(deck.cards);
    //const valid = deckList.every((c: any) => c.game.toUpperCase() === deck.game.toUpperCase());
    const valid = validateWithRule(deckList as WeissCard[], weissRules);

    if(!valid) {
        ctx.throw(400, 'The deck does not follow deck construction rules.');
    }

    const code = await generateUniqueCode();
    deck.code = code;

    await deckService.saveDeckService(deck);
    ctx.body = {
        code
    };
});


router.get('/view/:code', async ctx => {
    const code = ctx.params.code;
    const deck = await deckService.findListByCode(code);
    if(deck == null) {
        ctx.throw(404, 'Could not find deck');
    }
    ctx.body = deck;
});


export default router;