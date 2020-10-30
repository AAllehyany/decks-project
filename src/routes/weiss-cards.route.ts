import Router from '@koa/router';
import knex from 'knex';
import {searchCardsService, SearchSchema} from '../services/weiss-card.service';
import {searchQuerySchema} from '../schemas/weiss-card.schema';

const setUpRoutes = (db: knex): Router =>  {
    const router = new Router({
        prefix: '/weiss-cards',
    });
    
    router.get('/', async (ctx) => {
        const searchQuery = ctx.query;
        console.log(searchQuery);
        const result = await searchCardsService(db, (searchQuery as SearchSchema));
        ctx.body = result;
        ctx.status = 200;
    });


    return router;
}

export default setUpRoutes;