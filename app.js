const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// var confirmDialog = require('confirm-dialog')
const routes = require('./routes')    // 等同 const routes = require('./routes/index')

const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use((req, res, next) => {
  const date = new Date().toLocaleString('zh-TW')
  console.log(`${date} | ${req.method} from ${req.url}`)
  next()
})

// 設定首頁路由
app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
