import Router from '@koa/router';
import knex from 'knex';
import bcrypt from 'bcrypt';
import * as userService from '../services/user.service';
import * as tokenService from '../services/token-provider.service';
import {authenticationSchema} from '../schemas/authentication.schema';
const setupRoutes = (db: knex) => {
    const router = new Router({
        prefix: '/token',
    });

    router.post('/', async ctx => {
        const data = ctx.request.body;
        await authenticationSchema.validateAsync(data);

        const user = await userService.getByUsername(db, data.username);

        if(user.length == 0) {
            ctx.throw(401)
        }

        const passwordValid = await bcrypt.compare(data.password, user[0].password);
        if(!passwordValid) {
            ctx.throw(401);
        }

        const accessToken = await tokenService.provideBotToken();
        ctx.status = 200;
        ctx.body = {
            accessToken
        }
    })

    return router;
}


export default setupRoutes;