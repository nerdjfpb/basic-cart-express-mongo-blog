//----- Basic api one
// const express = require('express')

// const port = 5000
// const app = express()

// app.get('/', (req, res) => {
//   res.send({
//     message: 'helllo from express app',
//   })
// })

// app.listen(port, () => {
//   console.log(`Starting app with ${port}`)
// })

//----- With mongodb
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const port = 5000
const app = express()

app.use(cors())
app.use(express.json())

//database connect (please update this as per your computer)
mongoose.connect('mongodb://localhost:27017/cartpractice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Schema (you can change as you want)
const Cart = mongoose.model('Cart', {
  itemName: String,
  itemPrice: Number,
  quantity: Number,
})

// Adding a cart item
app.post('/cart', (req, res) => {
  const { body } = req

  const singleCartItem = new Cart(body)

  singleCartItem.save().then(() =>
    res.send({
      message: 'succesffully added',
      data: body,
    })
  )
})

// Getting all the cart items
app.get('/cart', (req, res) => {
  Cart.find({}, function (err, result) {
    if (err) {
      return res.status(500).send({ message: 'Failed', data: err })
    }

    res.send({ message: 'request successful', data: result })
  })
})

// Getting a single cart item
app.get('/cart/:id', (req, res) => {
  Cart.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.status(500).send({ message: 'Failed', data: err })
    }

    res.send({ message: 'request successful', data: result })
  })
})

// update a cart item
app.put('/cart/:id', (req, res) => {
  const { itemName, itemPrice, quantity } = req.body

  Cart.findOneAndUpdate(
    { _id: req.params.id },
    { itemName, itemPrice, quantity },
    function (err, result) {
      if (err) {
        return res.status(500).send({ message: 'Failed', data: err })
      }

      res.send({
        message: 'succesffully updated data',
        data: { itemName, itemPrice, quantity },
      })
    }
  )
})

// Delete a cart item
app.delete('/cart/:id', (req, res) => {
  Cart.findOneAndDelete({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.status(500).send({ message: 'Failed', data: err })
    }

    res.send({ message: 'succesffully deleted', data: result })
  })
})

app.listen(port, () => {
  console.log(`Starting app with ${port}`)
})
