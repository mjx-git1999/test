const Koa = require('koa');

const app = new Koa()
const { connect , initSchemas } =require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')

app.use(bodyParser())
app.use(cors())
//装载所有子路由
let router = new Router()
router.use('/user',user.routes())
router.use('/goods',goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async()=>{
  await connect()
  initSchemas()
  const User = mongoose.model('User')
//   let oneUser = new User({userName:'kristen05',password:'123456'})
//   oneUser.save().then(()=>{
//       console.log('插入成功')
//   })
//   let user = await User.findOne({}).exec()
//   console.log('...')
//   console.log(user)
//   console.log('...')
})()


app.use(async(ctx) =>{
    ctx.body='<h1>Hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})