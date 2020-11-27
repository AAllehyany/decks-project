import Router from '@koa/router';
import Joi from 'joi';
import {addCardsMany} from '../services/cards.service';
import {weissCardSchema} from '../schemas/weiss-card.schema';
import firebaseAuth from '../middlewares/firebase-auth';

import {ICreateGameInput, createGameSchema} from '../schemas/game_schema';
import {createGame} from '../services/game.service';
import { createExpansionSchema, ICreateExpansionInput } from '../schemas/expansion_schema';
import { createExpansion } from '../services/expansion.service';
import {ICreateSearchSchemaInput} from '../schemas/search-schema';
import { createSearchForm } from '../services/search-form.service';

/**
 * Koa router for admin related routes.
 * All routes are protected by Auth middleware.
 */
const router = new Router({
    prefix: '/admin',
});

router.use(firebaseAuth);

/**
 * Route to create multiple cards and add them to the database.
 * 
 */
router.post('/card/create', async ctx => {
    const cards = ctx.request.body;
    const cardList = Joi.array().items(weissCardSchema);
    await cardList.validateAsync(cards);
    const added = await addCardsMany(cards, '1');
    ctx.status = 200;
    ctx.body = {
        message: "Cards have been created successfully",
    }
});

/**
 * Route to create a single game.
 */
router.post('/game/create', async ctx => {
    const game: ICreateGameInput = ctx.request.body;
    await createGameSchema.validateAsync(game);
    const added = await createGame(game);
    ctx.status = 200;
    ctx.body = {
        message: "Game has been created successfully"
    }
});

/**
 * Route to create title.
 */
router.post('/title/create', async ctx => {
    const title: ICreateExpansionInput = ctx.request.body;
    await createExpansionSchema.validateAsync(title);
    const added = await createExpansion(title);
    ctx.status = 200;
    ctx.body = {
        message: "Title has been created successfully"
    }
});

// router.post('/form/create', async ctx => {
//     const searchForm: ICreateSearchSchemaInput = ctx.request.body;
//     const added = await createSearchForm(searchForm);
//     ctx.status = 200;
//     ctx.body = {
//         added
//     }
// });

export default router;