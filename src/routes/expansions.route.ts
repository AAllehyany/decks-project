import Router from '@koa/router';
import { getAllExpansions } from '../services/expansion.service';

const router = new Router({
    prefix: '/titles',
});

/**
 * Route to get all the expansions
 */
router.get('/', async ctx => {
    const titles = await getAllExpansions();
    ctx.body = titles;
    ctx.status = 200;
});


export default router;