const express = require('express')
const hbs = require('hbs')
const path = require('path')
const regexgen = require('regexgen')
const captcha = require('./captcha')

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
  res.render('home', {
    isRegexPage: true,
    isCaptchaPage: false,
    // username: USERS['tester'].username,
  })
})

app.post('/update-regex', (req, res) => {
  const strings = req.body.strings
  const newRegex = regexgen(strings).toString()
  res.json(newRegex)
})

app.get('/generate-captcha', (req, res) => {
  const { regex } = req.query
  console.log(regex)
  res.render('home', {
    isRegexPage: false,
    isCaptchaPage: true,
    regex: regex,
    captchaImage: String.raw`data:image/png;base64,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`,
    captchaText: '02f1b1',
    // username: USERS['tester'].username,
  })
})

app.get('/captcha/:width?/:height?/', (req, res) => {
  const width = parseInt(req.params.width) || 200
  const height = parseInt(req.params.height) || 100
  const { image, text } = captcha(width, height)
  res.send({ image, text })
})

app.listen(port, () => {
  console.log(`Server is up at port ${port}`)
})
