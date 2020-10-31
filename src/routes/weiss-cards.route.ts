import Router from '@koa/router';
import knex from 'knex';
import koajwt from 'koa-jwt';
import Joi from 'joi';
import {searchCardsService, SearchSchema, addManyService} from '../services/weiss-card.service';
import {searchQuerySchema, createCardSchema} from '../schemas/weiss-card.schema';

const setUpRoutes = (db: knex): Router =>  {
    const router = new Router({
        prefix: '/weiss-cards',
    });

    router.use(['/create'], koajwt({secret: process.env.JWT_SECRET ?? 'secret'}));
    
    router.get('/', async (ctx) => {
        const searchQuery = ctx.query;
        console.log(searchQuery);
        const result = await searchCardsService(db, (searchQuery as SearchSchema));
        ctx.body = result;
        ctx.status = 200;
    });

    router.post('/create', async ctx => {
        const cards = ctx.request.body;
        const cardList = Joi.array().items(createCardSchema);
        await cardList.validateAsync(cards);
        const added = await addManyService(db, cards, ctx.state.user.user_id);
        ctx.status = 200;
        ctx.body = {
            added
        }
    });


    return router;
}

export default setUpRoutes;