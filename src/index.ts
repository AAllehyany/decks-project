import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import cardRoutes from './routes/weiss-cards.route';
import tokenRoutes from './routes/token.routes';
import {ValidationError} from 'joi';

import mongoose from 'mongoose';



const app = new Koa();
const weissCardRoutes = cardRoutes();
const tokenRoute = tokenRoutes();


mongoose.connect('mongodb://localhost:27017/decks');

app.use(cors());
app.use(json());
app.use(bodyparser());

app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
        if(e instanceof ValidationError) {
            ctx.status = 401;
            ctx.body = {
                error: e.message
            }
        } else {
            ctx.status = e.status || 500;
            ctx.body = {
                message: e.message,
            }
            ctx.app.emit('eor', e, ctx);
        }
        
    }
  });


app.use(weissCardRoutes.routes()).use(weissCardRoutes.allowedMethods());
app.use(tokenRoute.routes()).use(tokenRoute.allowedMethods());
app.listen(3000, () => {
    console.log("Running.....");
})