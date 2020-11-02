import * as deckService from '../services/decks.service';
import {createDeckSchema} from '../schemas/deck_schema';
import {generateUniqueCode} from '../services/code-generation.service';
import {fetchCards} from '../services/cards.service';
import {validateWeissDeck} from '../services/deck-validation.service';


import Router from '@koa/router';
import { WeissCard } from '../schemas/weiss-card.schema';

const router = new Router({
    prefix: '/decks'
});

router.post('/save', async ctx => {
    const deck = ctx.request.body;
    const code = await generateUniqueCode();
    deck.code = code;
    await createDeckSchema.validateAsync(deck);
    const deckList = await fetchCards(deck.cards);
    const valid = validateWeissDeck(deckList as WeissCard[]);
    if(!valid) {
        throw new Error('invalid deck sent');
    }
    
    const result = await deckService.saveDeckService(deck);
    ctx.body = {
        code
    };
});


router.get('/view/:code', async ctx => {
    const code = ctx.params.code;
    const deck = await deckService.findByCode(code);
    ctx.body = deck;
});


export default router;