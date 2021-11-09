const signUpOverlayButton = document.getElementById('signup-overlay-btn')
const signInOverlayButton = document.getElementById('login-overlay-btn')
const container = document.getElementById('container')
const loginForm = document.getElementById('login_form')
const signupForm = document.getElementById('signup_form')
const loginButton = document.getElementById('login_btn')
const signupButton = document.getElementById('signup_btn')

signUpOverlayButton.addEventListener('click', () => {
  container.classList.add('right-panel-active')
})

signInOverlayButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active')
})

loginButton.addEventListener('click', (event) => {
  event.preventDefault()
  const username = 'tester'
  const emailElement = document.querySelector('form#login_form input[type=email]')
  const passwordElement = document.querySelector('form#login_form input[type=password]')

  const email = emailElement.value
  const password = passwordElement.value

  const userData = {
    username: username,
    email: email,
    password: password,
  }

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

  //   axios
  //     .post('/login', userData)
  //     .then((response) => {
  //       console.log('login response:::', response.data)

  //       if (response.data.message !== 'Login succesful') {
  //         return alert('Unable to login. Please try again')
  //       }

  //       //   window.location = '/posts'
  //     })
  //     .catch((error) => {
  //       console.log('login error:::', error)
  //     })
})

signupButton.addEventListener('click', (event) => {
  event.preventDefault()
  const usernameElement = document.querySelector('form#signup_form input[type=text]')
  const emailElement = document.querySelector('form#signup_form input[type=email]')
  const passwordElement = document.querySelector('form#signup_form input[type=password]')

  const username = usernameElement.value
  const email = emailElement.value
  const password = passwordElement.value

  const userData = {
    username: username,
    email: email,
    password: password,
  }

  loginUser(userData)
})

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
