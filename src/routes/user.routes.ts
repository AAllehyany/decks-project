import bcrypt from 'bcrypt';
import knex from 'knex';
import * as userService from '../services/user.service';
import Router from '@koa/router';

const setupRoutes = (db: knex) => {
    const router = new Router({
        prefix: '/users'
    });

    router.get('/', async ctx => {
        const users = await userService.getUsers(db);
        ctx.body = users;
    });

    return router;
}

export default setupRoutes;