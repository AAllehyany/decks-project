import Router from '@koa/router';
import {getAllGames} from '../services/game.service';

const router = new Router({
    prefix: '/games',
});


router.get('/', async ctx => {
    const games = await getAllGames();
    ctx.body = games;
    ctx.status = 200;
});

export default router;