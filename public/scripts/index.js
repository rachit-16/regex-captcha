const signUpOverlayButton = document.getElementById('signup-overlay-btn')
const signInOverlayButton = document.getElementById('login-overlay-btn')
const container = document.getElementById('container')
const loginForm = document.getElementById('login_form')
const signupForm = document.getElementById('signup_form')
const loginPassword = document.querySelector('.login_form input[name=password]')
const signUpPassword = document.querySelector('.signup_form input[name=password]')
const loginButton = document.getElementById('login_btn')
const signupButton = document.getElementById('signup_btn')

signUpOverlayButton.addEventListener('click', () => {
  container.classList.add('right-panel-active')
})

signInOverlayButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active')
})

const validateCredentials = (email, password) => {
  if (!email) {
    window.alert('Please enter your email address!')
    return false
  }

  if (!password) {
    window.alert('Please enter your password!')
    return false
  }

  //email regex

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address!')
    return false
  }


//password regex
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/
  if (!passwordRegex.test(password)) {
    alert(
      `Please enter a valid password that matches the following conditions:
     💡 Must be between 8 to 20 characters long (both inclusive),
     💡 Must contain atleast one uppercase character,
     💡 Must contain atleast one digit,
     💡 Must contain atleast one special character`
    )
    return false
  }

  return true
}

const loginUser = (userData) => {
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      console.log('response::', response)
      return response.json()
    })
    .then((data) => {
      console.log('Success::', data)
      window.location = '/generate-regex'
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

const togglePassword = (event) => {
  const target = event.target
  let passwordField = document.querySelector('input[name=login-password]')
  if (target.getAttribute('id') === 'signup-toggle') {
    passwordField = document.querySelector('input[name=signup-password]')
  }

  if (target.innerText === '👁') {
    target.innerText = '🙈'
    passwordField.setAttribute('type', 'text')
    target.classList.add('showing-password')
  } else {
    target.innerText = '👁'
    passwordField.setAttribute('type', 'password')
    target.classList.remove('showing-password')
  }
}

loginButton.addEventListener('click', (event) => {
  event.preventDefault()
  const username = 'tester'
  const emailElement = document.querySelector('form#login_form input[type=email]')
  const passwordElement = document.querySelector('form#login_form input[type=password]')

  const email = emailElement.value
  const password = passwordElement.value

  if (!validateCredentials(email, password)) {
    return
  }

  const userData = {
    username: username,
    email: email,
    password: password,
  }

  loginUser(userData)

})

signupButton.addEventListener('click', (event) => {
  event.preventDefault()
  const usernameElement = document.querySelector('form#signup_form input[type=text]')
  const emailElement = document.querySelector('form#signup_form input[type=email]')
  const passwordElement = document.querySelector('form#signup_form input[type=password]')

  const username = usernameElement.value
  const email = emailElement.value
  const password = passwordElement.value

  if (!validateCredentials(email, password)) {
    return
  }

  const userData = {
    username: username,
    email: email,
    password: password,
  }

  loginUser(userData)
})


  /*
  /^[A-Za-z]\w{7,15}$/,
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
  */