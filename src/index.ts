import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import cardRoutes from './routes/cards.route';
import tokenRoutes from './routes/token.routes';
import deckRoutes from './routes/decks.route';
import {ValidationError} from 'joi';
import mongoose from 'mongoose';
import adminRoute from './routes/admin.route';
import logger from 'koa-logger';

const app = new Koa();
const weissCardRoutes = cardRoutes();
const tokenRoute = tokenRoutes();

mongoose.connect("mongodb://mongodb:27017/decks", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(logger())
app.use(cors());
app.use(json());
app.use(bodyparser());

app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
        if(e instanceof ValidationError) {
            ctx.status = 400;
            ctx.body = {
                message: `Received invalid input. ${e.details[0].message}`
            }
        } 
        
        else if(e.name ===  'CastError') {
            ctx.status = 400;
            ctx.body = {
                message: `Invalid value for ${e.path}: ${e.value}`
            }
        } 

        else {
            ctx.status = e.status || 500;
            ctx.app.emit('eor', e, ctx);
        }
        console.log(e);
    }
});

app.on('error', (err, ctx) => {
    /* centralized error handling:
     *   console.log error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
    */

    console.log(err);
});


app.use(weissCardRoutes.routes()).use(weissCardRoutes.allowedMethods());
app.use(tokenRoute.routes()).use(tokenRoute.allowedMethods());
app.use(deckRoutes.routes()).use(deckRoutes.allowedMethods());
app.use(adminRoute.routes()).use(adminRoute.allowedMethods());
app.listen(3000, () => {
    console.log("Running.....");
})