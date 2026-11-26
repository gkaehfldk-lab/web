const form = document.querySelector('#login-form')
const fields = [...form.querySelectorAll('input[required]')]
const status = document.querySelector('#form-status')

const Adminid = "admin";
const passwd = "123456";

fields.forEach((field) => {
  field.addEventListener('input', () => {
    field.removeAttribute('aria-invalid')
  })
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const invalidField = fields.find((field) => !field.value.trim())

  fields.forEach((field) => {
    if (!field.value.trim()) {
      field.setAttribute('aria-invalid', 'true')
    }
  })

  if (invalidField) {
    status.textContent = `${invalidField.labels[0].textContent.trim()}을 입력해 주세요.`
    invalidField.focus()
    return
  }

  const [userId, password] = fields

  if (userId.value === Adminid && password.value === passwd) {
    window.location.href = 'bbs.html'
    return
  }

  fields.forEach((field) => {
    field.value = ''
    field.setAttribute('aria-invalid', 'true')
  })
  status.textContent = '아이디 및 비밀번호를 다시 입력해 주세요.'
  userId.focus()
})
