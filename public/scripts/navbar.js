const regexLink = document.getElementById('regex')
const captchaLink = document.getElementById('captcha')
const logoutIcon = document.querySelector('.logout')

regexLink.addEventListener('click', (event) => {
  event.preventDefault()
  window.location = '/generate-regex'
})

captchaLink.addEventListener('click', (event) => {
  event.preventDefault()
  window.location = '/generate-captcha'
})

logoutIcon.addEventListener('click', (event) => {
  event.preventDefault()
  window.location = '/'
  alert('Logged out successfully!')
})
