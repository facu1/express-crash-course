const { Router } = require('express')
const router = Router()

const users = [{ name: 'Kyle' }, { name: 'Sally' }]

const logger = (req, res, next) => {
  console.info(req.originalUrl)
  next()
}

router.use(logger)

router.get('/', (req, res) => {
  console.info(req.query.name)
  res.send('User List')
})

router.get('/new', (req, res) => {
  res.render('users/new')
})

router.post('/', (req, res) => {
  const isValid = false
  if (isValid) {
    users.push({ firstName: req.body.firstName })
    res.redirect(`/users/${users.length - 1}`)
  } else {
    console.error('Error')
    res.render('users/new', { firstName: req.body.firstName })
  }
})

router
  .route('/:id')
  .get((req, res) => {
    console.info(req.user)
    res.send(`Get User With ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`)
  })

router.param('id', (req, res, next, id) => {
  req.user = users[id]
  next()
})

module.exports = router