import Koa from 'koa';
import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import db from './database';
import cardRoutes from './routes/weiss-cards.route';
import userRoutes from './routes/user.routes';
import tokenRoutes from './routes/token.routes';

const app = new Koa();
const weissCardRoutes = cardRoutes(db);
const usersRoutes = userRoutes(db);
const tokenRoute = tokenRoutes(db);

app.use(json());
app.use(bodyparser());
app.use(usersRoutes.routes()).use(usersRoutes.allowedMethods());
app.use(weissCardRoutes.routes()).use(weissCardRoutes.allowedMethods());
app.use(tokenRoute.routes()).use(tokenRoute.allowedMethods());
app.listen(3000, () => {
    console.log("Running.....");
})