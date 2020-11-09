import Router from '@koa/router';
import {searchCardsService, addCardsMany} from '../services/cards.service';
import { SearchSchema } from '../schemas/search-schema';

const setUpRoutes = (): Router =>  {
    const router = new Router({
        prefix: '/cards',
    });
    
    router.get('/', async (ctx) => {
        const searchQuery = <SearchSchema>ctx.query;
        const result = await searchCardsService(searchQuery);
        ctx.body = result;
        ctx.status = 200;
    });

    return router;
}

export default setUpRoutes;