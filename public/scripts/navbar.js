const regexLink = document.getElementById('regex')
const captchaLink = document.getElementById('captcha')
const logoutIcon = document.querySelector('.logout')

if (window.location.pathname === '/generate-regex') {
  regexLink.classList.add('active')
  captchaLink.classList.remove('active')
} else if (window.location.pathname === '/generate-captcha') {
  regexLink.classList.remove('active')
  captchaLink.classList.add('active')
} else {
  regexLink.classList.remove('active')
  captchaLink.classList.remove('active')
}

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
