import Koa from 'koa';
import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import db from './database';
import cardRoutes from './routes/weiss-cards.route';

const app = new Koa();
const router = new Router();
const weissCardRoutes = cardRoutes(db);

router.get('/', async(ctx,next) => {
    ctx.body = {message: "Hello there!"};
    await next();
});


app.use(json());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());
app.use(weissCardRoutes.routes()).use(weissCardRoutes.allowedMethods());

app.listen(3000, () => {
    console.log("Running.....");
})