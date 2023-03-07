const express = require("express")
const app = express()
const userRouter = require('./routes/users')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

// app.get('/', (req, res, next) => {
//   res.render('index', { text: 'World' })
// })

app.use('/users', userRouter)

app.listen(3000, () => {
  console.info('Server start on port 3000')
})