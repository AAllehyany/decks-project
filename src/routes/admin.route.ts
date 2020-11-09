import Router from '@koa/router';
import Joi from 'joi';
import {addCardsMany} from '../services/cards.service';
import {weissCardSchema} from '../schemas/weiss-card.schema';
import firebaseAuth from '../middlewares/firebase-auth';

import {ICreateGameInput, createGameSchema} from '../schemas/game_schema';
import {createGame} from '../services/game.service';

const router = new Router({
    prefix: '/admin',
});

router.use(firebaseAuth);

router.post('/card/create', async ctx => {
    const cards = ctx.request.body;
    const cardList = Joi.array().items(weissCardSchema);
    await cardList.validateAsync(cards);
    const added = await addCardsMany(cards, '1');
    ctx.status = 200;
    ctx.body = {
        added
    }
});

router.post('/game/create', async ctx => {
    const game: ICreateGameInput = ctx.request.body;
    await createGameSchema.validateAsync(game);
    const added = await createGame(game);
    ctx.status = 200;
    ctx.body = {
        added
    }
});


export default router;