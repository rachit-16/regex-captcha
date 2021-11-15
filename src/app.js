const express = require('express')
const hbs = require('hbs')
const path = require('path')
const regexgen = require('regexgen')
const captcha = require('./captcha')
const getStrings = require('./get-strings')

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
    // username: USERS['tester'].username,
  })
})

app.get('/captcha/:width?/:height?/', (req, res) => {
  const width = parseInt(req.params.width) || 400
  const height = parseInt(req.params.height) || 190
  let { regex, limit } = req.query

  const strings = getStrings(regex, limit, 2000)
  console.log('strings::', strings)
  limit = strings.length

  const captchaImages = captcha(strings, limit, width, height)
  const data = strings.map((str, idx) => {
    return {
      text: str,
      image: captchaImages[idx],
    }
  })

  // const { image, text } = captcha(width, height)
  // res.send({ image, text })
  res.send(data)
})

app.listen(port, () => {
  console.log(`Server is up at port ${port}`)
})
