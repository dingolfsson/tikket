import { validate } from 'validate.js'

// constrains: objects
const constraints = {
  from: {
    email: {
      message: 'Þetta er ekki póstfang'
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: 'Lágmark 8 stafir'
    }
  },
  confirmPassword: {
    equality: 'password'
  },
  room: {
    numericality: {
      onlyInteger: true,
      notEven: 'Numbers only'
    }
  }
}

// validator: function
// params1 target: key
// params2 value: string
// params3 compareValue: string
// @return [boolean, message: string]
const validator = (target, value, compareValue) => {
  if (target === 'password') {
    validate({ password: value }, constraints)
  }
  if (target === 'confirmPassword') {
    validate({ password: value, confirmPassword: compareValue }, constraints)
  }
  if (target === 'email') {
    validate({ from: value }, constraints)
  }
  if (target === 'room') {
    validate({ room: value }, constraints)
  }
}

export default validator
