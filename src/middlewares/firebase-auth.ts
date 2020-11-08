
import admin from '../firebase-setup';
import {ParameterizedContext, DefaultContext, DefaultState, Next} from 'koa';

const middleWare = async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next: Next) =>{

    const auth = ctx.req.headers.authorization;
    if(!auth) ctx.throw(401, 'Unauthorized');

    try {
        const token = auth.replace('Bearer', '').trim();
        const decoded = await admin.auth().verifyIdToken(token);
        ctx.state.user = decoded;
        next();
    } catch(err) {
        ctx.throw(401, err)
    }
    

}


export default middleWare;