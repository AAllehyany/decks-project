import Router from '@koa/router';
import {searchCardsService, addCardsMany} from '../services/cards.service';
import { SearchSchema } from '../schemas/search-schema';

/**
 * Set up for card related routes.
 */
const setUpRoutes = (): Router =>  {

    /**
     * router providing card routes.
     */
    const router = new Router({
        prefix: '/cards',
    });
    
    /**
     * Gets all the cards from the database. Receives optional search query from 
     * query string.
     */
    router.get('/', async (ctx) => {
        const searchQuery = <SearchSchema>ctx.query;
        const result = await searchCardsService(searchQuery);
        ctx.body = result;
        ctx.status = 200;
    });

    return router;
}

export default setUpRoutes;