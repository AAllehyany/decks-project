import Router from '@koa/router';
import knex from 'knex';

const setUpRoutes = (db: knex): Router =>  {
    const router = new Router({
        prefix: '/weiss-cards',
    });
    
    router.get('/', async (ctx) => {
        const result = await db.select().table('weiss_cards');
        ctx.body = result;
        ctx.status = 200;
    });


    return router;
}

export default setUpRoutes;