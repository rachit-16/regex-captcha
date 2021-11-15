const alertDialog = document.getElementById('alert')
const stringInput = document.querySelector('input[name=string-input')
const regexOutput = document.querySelector('input[name=output')
const count = document.querySelector('span#count')
const regexTransferIcon = document.getElementById('regex-transfer')
const addButton = document.querySelector('button.add-btn')
const resetButton = document.querySelector('button.reset-btn')
const removeButton = document.querySelector('button.remove-btn')
const list = document.querySelector('ul.strings')
const regexDiv = document.getElementById('regex-output')
const listDiv = document.getElementById('strings-list')

let storedRegex = localStorage.getItem('regex')
let storedStrings = localStorage.getItem('strings')

const createNewItem = (input) => {
  let li = document.createElement('li')
  let text = document.createTextNode(input)
  let button = document.createElement('button')
  button.classList.add('remove-btn')
  button.setAttribute('onclick', 'removeString(event)')
  button.innerText = '✖ Remove'
  li.appendChild(text)
  li.appendChild(button)
  // li.setAttribute('id', `li-${strings.length + 1}`)

  return li
}

if (storedRegex) {
  regexDiv.classList.remove('hide')
  listDiv.classList.remove('hide')

  regexOutput.value = storedRegex
  storedStrings = JSON.parse(storedStrings)
  count.innerText = `[${storedStrings.length}]`

  storedStrings.forEach((str) => {
    const newItem = createNewItem(str)
    list.appendChild(newItem)
  })
}

const updateRegex = (strings) => {
  if (strings.length === 0) {
    reset(true)
    return
  }

  fetch('/update-regex', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ strings: [...strings] }),
  })
    .then((res) => res.json())
    .then((updatedRegex) => {
      regexOutput.value = updatedRegex
      localStorage.setItem('regex', updatedRegex)
    })
}

const reset = (resetAll) => {
  stringInput.value = ''

  if (resetAll) {
    regexOutput.value = ''
    list.innerHTML = ''
    count.innerText = '[0]'
    regexDiv.classList.add('hide')
    listDiv.classList.add('hide')
    localStorage.removeItem('regex')
    localStorage.removeItem('strings')
  }
}

const checkDuplicate = (input) => {
  let stringList = localStorage.getItem('strings')

  if (!stringList) {
    return false
  } else {
    stringList = JSON.parse(stringList)
  }

  let duplicate = stringList.includes(input)

  if (duplicate) {
    window.alert('String already in added string list')
    return true
  }

  return false
}

const addString = () => {
  const input = stringInput.value
  let stringList = localStorage.getItem('strings')

  if (!stringList) {
    stringList = []
  } else {
    stringList = JSON.parse(stringList)
  }

  if (!stringList || stringList.length === 0) {
    regexDiv.classList.remove('hide')
    listDiv.classList.remove('hide')
  }

  if (input && !checkDuplicate(input)) {
    const newItem = createNewItem(input)
    list.appendChild(newItem)
    stringList.push(input)
    count.innerText = `[${stringList.length}]`
    localStorage.setItem('strings', JSON.stringify(stringList))
    updateRegex(stringList)
    reset(false)
  }
}

const removeString = (event) => {
  // if(strings.length === 1)
  const btn = event.target
  const li = btn.parentElement
  const text = li.innerText.split('\n')[0]
  //   const idx = +li.id.split('-')[1] - 1

  list.removeChild(li)

  let stringList = JSON.parse(localStorage.getItem('strings'))
  let updatedStrings = stringList.filter((str) => str !== text)
  //   console.log(strings)
  if (updatedStrings.length === 0) {
    regexDiv.classList.add('hide')
    listDiv.classList.add('hide')
  } else {
    localStorage.setItem('strings', JSON.stringify(updatedStrings))
  }
  count.innerText = `[${updatedStrings.length}]`
  updateRegex(updatedStrings)
}

addButton.addEventListener('click', (event) => {
  addString()
})

resetButton.addEventListener('click', (event) => {
  if (window.confirm('Are you sure to reset everything?')) {
    reset(true)
  }
})

stringInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    //13 -> Enter key
    addString()
  }
})

regexTransferIcon.addEventListener('click', () => {
  localStorage.setItem('captchaRegex', regexOutput.value)
  localStorage.removeItem('captchaLimit')
  localStorage.removeItem('captchaData')
  window.location = '/generate-captcha'
})
