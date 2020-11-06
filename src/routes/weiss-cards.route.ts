import Router from '@koa/router';
import knex from 'knex';
import koajwt from 'koa-jwt';
import Joi from 'joi';
import {searchCardsService, SearchSchema, addCardsMany} from '../services/cards.service';
import {searchQuerySchema, weissCardSchema} from '../schemas/weiss-card.schema';

const setUpRoutes = (): Router =>  {
    const router = new Router({
        prefix: '/weiss-cards',
    });

    //router.use(['/create'], koajwt({secret: process.env.JWT_SECRET ?? 'secret'}));
    
    router.get('/', async (ctx) => {
        const searchQuery = ctx.query;
        const result = await searchCardsService((searchQuery as SearchSchema));
        ctx.body = result;
        ctx.status = 200;
    });

    router.post('/create', async ctx => {
        const cards = ctx.request.body;
        const cardList = Joi.array().items(weissCardSchema);
        await cardList.validateAsync(cards);
        const added = await addCardsMany(cards, '1');
        // await weissCardSchema.validateAsync(cards);
        // const added = await addCardService(cards, 1, 1);
        ctx.status = 200;
        ctx.body = {
            added
        }
    });


    return router;
}

export default setUpRoutes;