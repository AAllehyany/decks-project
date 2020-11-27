import Router from '@koa/router';
import {getAllGames, getGameAndForm} from '../services/game.service';
/**
 * Provides game related routes
 */
const router = new Router({
    prefix: '/games',
});

/**
 * Route to get search query form for the given game.
 */
router.get('/:code', async ctx => {

    const resp = await getGameAndForm(ctx.params.code);

    ctx.body = resp;
    ctx.status = 200;
});

/**
 * Route to get all games in db
 */
router.get('/', async ctx => {
    const games = await getAllGames();
    ctx.body = games;
    ctx.status = 200;
});


export default router;