const alertDialog = document.getElementById('alert')
const stringInput = document.querySelector('input[name=string-input')
const regexOutput = document.querySelector('input[name=output')
const regexTransferIcon = document.getElementById('regex-transfer')
const addButton = document.querySelector('button.add-btn')
const resetButton = document.querySelector('button.reset-btn')
const removeButton = document.querySelector('button.remove-btn')
const list = document.querySelector('ul.strings')
const regexDiv = document.getElementById('regex-output')
const listDiv = document.getElementById('strings-list')

let input = ''
let strings = []
let regex = ''

const updateRegex = (strings) => {
  if (strings.length === 0) {
    regex = 'null'
    regexOutput.value = 'null'
    return
  }

  fetch('/update-regex', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ strings: [...strings] }),
  })
    .then((res) => {
      console.log(res)
      return res.json()
    })
    .then((updatedRegex) => {
      regex = updatedRegex
      regexOutput.value = updatedRegex
    })
}

const reset = (resetAll) => {
  input = ''
  stringInput.value = ''

  if (resetAll) {
    list.innerHTML = ''
    strings = []
    stringsMap = {}
    regexDiv.classList.add('hide')
    listDiv.classList.add('hide')
    updateRegex(strings)
  }
}

const addString = () => {
  input = stringInput.value

  if (strings.length === 0) {
    regexDiv.classList.remove('hide')
    listDiv.classList.remove('hide')
  }

  const checkDuplicate = () => {
    let duplicate = strings.includes(input)

    if (duplicate) {
      window.alert('String already in added string list')
      return true
    }

    return false
  }

  const createNewItem = (input) => {
    let li = document.createElement('li')
    let text = document.createTextNode(input)
    let button = document.createElement('button')
    button.classList.add('remove-btn')
    button.setAttribute('onclick', 'removeString(event)')
    button.innerText = '✖ Remove'
    li.appendChild(text)
    li.appendChild(button)
    li.setAttribute('id', `li-${strings.length + 1}`)

    return li
  }

  if (input && !checkDuplicate()) {
    const newItem = createNewItem(input)
    list.appendChild(newItem)
    strings.push(input)
    updateRegex(strings)
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

  strings = strings.filter((str) => str !== text)
  //   console.log(strings)

  if (strings.length === 0) {
    regexDiv.classList.add('hide')
    listDiv.classList.add('hide')
  }

  updateRegex(strings)
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
  const regex = regexOutput.value
  localStorage.setItem('regex', regex)
  window.location = '/generate-captcha'
})
