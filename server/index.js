let express = require('express')
let appData = require('./data.json')
const cors = require('cors')

let apiRoutes = express.Router()

let seller = appData.seller
let goods = appData.goods
let ratings = appData.ratings

let app = express()
app.use(
  cors({ origin: /(http:\/\/*)/, credentials: true })
)

app.get('/', function (req, res) {
  res.send('hello world')
})

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller,
  })
})

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods,
  })
})

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings,
  })
})

app.use('/api', apiRoutes)

app.listen(9988)
