var koa = require('koa');
var Router = require('koa-router');
var cors = require('koa-cors')

const app = new koa();
const router = Router();


const data = require('./data.json')


router.get('/', (ctx, next) => {
    ctx.body = data;
});

app.use(cors())
app.use(router.routes());

app.listen(3030);
