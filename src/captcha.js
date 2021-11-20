const { createCanvas, Image, registerFont } = require('canvas')
registerFont('src/assets/Comforter-Regular.ttf', { family: 'cursive' })

// const alternateCapitals = (str) => [...str].map((char) => char.toUpperCase()).join('')

// [...str].map((char, i) => char[`to${i % 2 ? 'Upper' : 'Lower'}Case`]()).join('')

// const randomizeText = (text) => alternateCapitals(text)

const FONTBASE = 160
const FONTSIZE = 40

const relativeFont = (width) => {
  const ratio = FONTSIZE / FONTBASE
  const size = width * ratio
  return `${size}px cursive`
}

const arbitraryRandom = (min, max) => Math.random() * (max - min) + min

const randomRotation = (degrees = -5) => (arbitraryRandom(-degrees, degrees) * Math.PI) / 180

const configureText = (ctx, text, width, height) => {
  ctx.font = relativeFont(width)
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(179, 114, 240, 0.63)'
  // ctx.textSpa
  // text = randomizeText(text)
  // text = text.toLowerCase()
  ctx.fillText(text, width / 2, height / 2)
}

const setBGImg = (ctx, width, height) => {
  const bgImg = new Image()
  bgImg.onload = () => ctx.drawImage(bgImg, 0, 0, width, height)
  bgImg.onerror = (err) => {
    throw err
  }
  bgImg.src = 'src/assets/captcha-bg.png'
}

const generate = (strings, limit, width, height) => {
  const captchas = []

  for (let i = 0; i < limit; i++) {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    setBGImg(ctx, width, height)

    ctx.rotate(randomRotation())
    configureText(ctx, strings[i], width, height)
    captchas.push(canvas.toDataURL())
  }

  return [...captchas]
}

module.exports = generate
