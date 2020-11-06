import Router from '@koa/router';
import knex from 'knex';
import koajwt from 'koa-jwt';
import Joi from 'joi';
import {searchCardsService, addCardsMany} from '../services/cards.service';
import {weissCardSchema} from '../schemas/weiss-card.schema';
import { SearchSchema } from '../schemas/search-schema';

const setUpRoutes = (): Router =>  {
    const router = new Router({
        prefix: '/cards',
    });
    
    router.get('/', async (ctx) => {
        const searchQuery = ctx.query;
        const result = await searchCardsService((searchQuery as SearchSchema));
        ctx.body = result;
        ctx.status = 200;
    });

    return router;
}

export default setUpRoutes;