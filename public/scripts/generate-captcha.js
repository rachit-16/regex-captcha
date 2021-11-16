const regexInput = document.querySelector('input[name=regex-input]')
const limitInput = document.querySelector('input[name=limit-input]')
const count = document.querySelector('span#count')
const generateBtn = document.querySelector('button.generate-btn')
const resetBtn = document.querySelector('button#reset-btn')
const list = document.querySelector('ul.captchas')
const downloadAll = document.querySelector('div.download')

let regex = localStorage.getItem('captchaRegex')
let limit = +localStorage.getItem('captchaLimit')
let captchaData = localStorage.getItem('captchaData')

const createNewItem = (text, image) => {
  let li = document.createElement('li')
  let textSpan = document.createElement('span')
  let iconSpan = document.createElement('span')
  let img = document.createElement('img')
  let i = document.createElement('i')

  textSpan.classList.add('text')
  textSpan.innerText = text

  img.classList.add('generated-captcha')
  img.setAttribute('src', image)
  img.setAttribute('width', '260px')
  img.setAttribute('height', '90px')

  iconSpan.classList.add('download')
  // iconSpan.setAttribute('id', 'tooltip-container')
  iconSpan.setAttribute('onclick', 'getDataOne(event)')
  // iconSpan.setAttribute('onmouseenter', 'showTooltip(event)')
  iconSpan.setAttribute('data-tooltip', 'Download JSON file for THIS captcha?')

  i.classList.add('fas', 'fa-file-download')
  // i.setAttribute('onmouseenter', 'showTooltip(event)')

  li.appendChild(textSpan)
  li.appendChild(img)
  iconSpan.appendChild(i)
  li.appendChild(iconSpan)

  return li
}

if (regex) {
  regexInput.value = regex
}

if (limit) {
  limitInput.value = limit
}

if (captchaData) {
  captchaData = JSON.parse(captchaData)
  captchaData.forEach(({ text, image }) => {
    const newItem = createNewItem(text, image)
    list.appendChild(newItem)
  })

  count.innerText = `[${captchaData.length}]`
}

const generate = (event) => {
  event.preventDefault()
  regex = regexInput.value
  limit = +limitInput.value

  if (!regex) {
    window.alert('Please enter Regex to continue!')
    return
  }

  if (!limit) {
    window.alert('Please enter Limit to continue!')
    return
  }

  if (limit === 0) {
    window.alert('Enter a limit greater than 0!')
    return
  }

  localStorage.setItem('captchaRegex', regex)
  localStorage.setItem('captchaLimit', limit)

  fetch(`/captcha?regex=${regex}&limit=${limit}`)
    .then((data) => data.json())
    .then((data) => {
      if (list.children.length > 0) {
        list.innerHTML = ''
        count.innerText = '[0]'
      }

      data.map(({ text, image }) => {
        let newItem = createNewItem(text, image)
        list.appendChild(newItem)
      })

      count.innerText = `[${data.length}]`
      localStorage.setItem('captchaData', JSON.stringify(data))
    })
    .catch((error) => {
      console.error('Error::', error)
    })
}

const downloadJSON = (data, { all }) => {
  // //Convert obj to JSON string.
  let json = JSON.stringify(data)

  // //Convert JSON string to BLOB.
  json = [json]
  var blob1 = new Blob(json, { type: 'application/json' })

  // generate filename
  const filename = all ? 'captchas_all.json' : `captcha_${data.text}.json`
  // //Check the Browser.
  var isIE = false || !!document.documentMode
  if (isIE) {
    window.navigator.msSaveBlob(blob1, filename)
  } else {
    var url = window.URL || window.webkitURL
    link = url.createObjectURL(blob1)
    var a = document.createElement('a')
    a.download = filename
    a.href = link
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

const getDataOne = (event) => {
  const target = event.target
  let li
  if (target.hasAttribute('class')) {
    li = target.parentElement.parentElement
  } else {
    li = target.parentElement.parentElement.parentElement
  }

  const text = li.children[0].innerText
  const imgURL = li.children[1].getAttribute('src')

  const data = { text: text, image: imgURL }
  downloadJSON(data, { all: false })
}

// const showTooltip = (event) => {
//   const target = event.target
//   console.log(target.style)
//   const tooltipSpan = document.createElement('span')
//   const tooltipText = document.createTextNode('Download JSON file for THIS captcha?')
//   tooltipSpan.setAttribute('id', 'tooltip')
//   tooltipSpan.appendChild(tooltipText)
//   target.parentElement.appendChild(tooltipSpan)
// }

// const hideTooltip = () => {
//   const tooltipSpan = document.querySelector('span#tooltip')
//   tooltipSpan.remove()
// }

const resetAll = () => {
  regexInput.value = ''
  limitInput.value = ''
  list.innerHTML = ''
  count.innerText = '[0]'
  localStorage.removeItem('captchaRegex')
  localStorage.removeItem('captchaLimit')
  localStorage.removeItem('captchaData')
}

generateBtn.addEventListener('click', (event) => generate(event))

resetBtn.addEventListener('click', (event) => {
  if (window.confirm('Are you sure to reset everything?')) {
    resetAll()
  }
})

downloadAll.addEventListener('click', () => {
  const captchaData = JSON.parse(localStorage.getItem('captchaData'))
  if (!captchaData) {
    window.alert('Please generate some captchas to download them!')
    return
  }
  const captchaDataObj = {}
  captchaData.map((data, idx) => {
    captchaDataObj[`captcha-${idx + 1}`] = { ...data }
  })

  downloadJSON(captchaDataObj, { all: true })
})

// const generateStrings =
// const alertDialog = document.getElementById('alert')
// const stringInput = document.querySelector('input[name=string-input')
// const regexOutput = document.querySelector('input[name=output')
// const regexTransferIcon = document.getElementById('regex-transfer')
// const addButton = document.querySelector('button.add-btn')
// const resetButton = document.querySelector('button.reset-btn')
// const removeButton = document.querySelector('button.remove-btn')
// const list = document.querySelector('ul.strings')
// const regexDiv = document.getElementById('regex-output')
// const listDiv = document.getElementById('strings-list')

// let input = ''
// let strings = []
// let regex = ''

// const updateRegex = (strings) => {
//   if (strings.length === 0) {
//     regex = 'null'
//     regexOutput.value = 'null'
//     return
//   }

//   fetch('/update-regex', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ strings: [...strings] }),
//   })
//     .then((res) => {
//       console.log(res)
//       return res.json()
//     })
//     .then((updatedRegex) => {
//       regex = updatedRegex
//       regexOutput.value = updatedRegex
//     })
// }

// const reset = (resetAll) => {
//   input = ''
//   stringInput.value = ''

//   if (resetAll) {
//     list.innerHTML = ''
//     strings = []
//     stringsMap = {}
//     regexDiv.classList.add('hide')
//     listDiv.classList.add('hide')
//     updateRegex(strings)
//   }
// }

// const addString = () => {
//   input = stringInput.value

//   if (strings.length === 0) {
//     regexDiv.classList.remove('hide')
//     listDiv.classList.remove('hide')
//   }

//   const checkDuplicate = () => {
//     let duplicate = strings.includes(input)

//     if (duplicate) {
//       window.alert('String already in added string list')
//       return true
//     }

//     return false
//   }

//   const createNewItem = (input) => {
//     let li = document.createElement('li')
//     let text = document.createTextNode(input)
//     let button = document.createElement('button')
//     button.classList.add('remove-btn')
//     button.setAttribute('onclick', 'removeString(event)')
//     button.innerText = '✖ Remove'
//     li.appendChild(text)
//     li.appendChild(button)
//     li.setAttribute('id', `li-${strings.length + 1}`)

//     return li
//   }

//   if (input && !checkDuplicate()) {
//     const newItem = createNewItem(input)
//     list.appendChild(newItem)
//     strings.push(input)
//     updateRegex(strings)
//     reset(false)
//   }
// }

// const removeString = (event) => {
//   // if(strings.length === 1)
//   const btn = event.target
//   const li = btn.parentElement
//   const text = li.innerText.split('\n')[0]
//   //   const idx = +li.id.split('-')[1] - 1

//   list.removeChild(li)

//   strings = strings.filter((str) => str !== text)
//   //   console.log(strings)

//   if (strings.length === 0) {
//     regexDiv.classList.add('hide')
//     listDiv.classList.add('hide')
//   }

//   updateRegex(strings)
// }

// addButton.addEventListener('click', (event) => {
//   addString()
// })

// resetButton.addEventListener('click', (event) => {
//   if (window.confirm('Are you sure to reset everything?')) {
//     reset(true)
//   }
// })

// stringInput.addEventListener('keyup', (event) => {
//   if (event.keyCode === 13) {
//     //13 -> Enter key
//     addString()
//   }
// })

// regexTransferIcon.addEventListener('click', () => {
//   const regex = regexOutput.value
//   localStorage.setItem('regex', regex)
//   window.location = '/generate-captcha'
// })
