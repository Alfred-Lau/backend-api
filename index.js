var koa = require('koa');
var Router = require('koa-router');
var cors = require('koa-cors');
var koaBodyparser = require('koa-bodyparser');

var db = require('./db');
var {initProfileListData} = require('./db-local/profile-list')

const app = new koa();
const router = Router();

app.use(koaBodyparser());
app.use(cors());

// 修改了json数据，必须重启，因为require是有缓存的

router.get('/', async (ctx, next) => {
    let bodys = '';
    await db.selectAll()
    .then(result => {
        bodys = JSON.parse(JSON.stringify(result));
    });
    ctx.body = bodys;
});

router.get('/generateRandom', async (ctx, next) => {
    await db.generateRandom().then((res) => {
        if (res.affectedRows) {
            ctx.body = 'ok'    
        }
    })
})

router.get('/profile-list', (ctx, next) => {
    ctx.body = initProfileListData();
})

router.get('/detail/:id', (ctx, next) => {
    const id = ctx.params
    console.log(id)
    ctx.body = 'get data'
})

router.post('/delete', async (ctx, next) => {
    const {id} = ctx.request.body

    await db.deleteOne(id).then((res) => {
        if (res.affectedRows > 0) {
            ctx.body = 'ok'
        }
    })

});

router.post('/login',  (ctx, next) => {
    const params = ctx.request.body
    const result = db.authorize(params)
    if (result === true) {
        ctx.body = 'success'
    } else {
        console.log('backend err')
        ctx.body = 'failed'
    }
})


app.use(router.routes());

app.listen(3030);
