import Router from '@koa/router';
import {getAllGames, getGameAndForm} from '../services/game.service';

const router = new Router({
    prefix: '/games',
});


router.get('/:code', async ctx => {

    const resp = await getGameAndForm(ctx.params.code);

    ctx.body = resp;
    ctx.status = 200;
});

router.get('/', async ctx => {
    const games = await getAllGames();
    ctx.body = games;
    ctx.status = 200;
});


export default router;