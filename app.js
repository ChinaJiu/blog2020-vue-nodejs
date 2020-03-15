const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');
const views = require('koa-views');
const {resolve} = require('path')
const koaStatic = require('koa-static')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(koaStatic(__dirname + '/public'))
app.use(views(resolve(__dirname, './views'), {
  extension: 'ejs'
}))
app.use(cors({
  origin: function (ctx) {
      // if (ctx.url === '/test') {
      //     return "*"; // 允许来自所有域名请求
      // }
      return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  credentials: true
}))
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(3000, () => {
  console.log('Koa is listening in http://localhost:3000')
})

module.exports = app
