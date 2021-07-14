const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const createError = require('http-errors')
require('./configurations/mongoose')

const userRoutes = require('./routers/userRoute')
const bookRoutes = require('./routers/bookRoute')
const orderRoutes = require('./routers/orderRoute')

var corsOptions = { origin: '*', credentials: true };

const app = express()
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false,limit:'10mb' }))
// app.use(bodyParser.json({limit:'50mb'})); 
// app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use('/uploads', express.static('uploads'));

app.use(userRoutes);
app.use(bookRoutes);
app.use(orderRoutes);

app.get('/', async (req, res, next) => {
  res.send('Hello from express.')
})


app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
