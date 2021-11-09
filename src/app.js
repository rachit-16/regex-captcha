const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.json())
app.use(express.static(publicDirPath))
app.use(
  '/scripts',
  express.static(path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free'))
)

const USERS = {
  tester: {
    username: 'tester',
    email: 'test@test.com',
    password: 'tester',
  },
}

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  console.log('->', req.body)
  res.json({ username: Object.keys(req.body)[0] })
})

app.get('/generate-regex', (req, res) => {
  res.render('generate-regex', {
    username: USERS['tester'].username,
  })
})

app.get('/generate-captcha', (req, res) => {
  res.render('generate-captcha', {
    username: USERS['tester'].username,
  })
})

app.listen(port, () => {
  console.log(`Server is up at port ${port}`)
})
