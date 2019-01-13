import React from 'react'
import { validate } from 'validate.js'

const constraints = {
  from: {
    email: {
      message: "Þetta er ekki póstfang"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 12,
      message: "Lágmark 12 stafir"
    }
  },
  confirmPassword: {
    equality: "password"
  },
  room: {
    numericality: {
      onlyInteger: true,
      notEven: "Numbers only"
    }
  }
};

const validator = (target, value, compareValue) => {
  console.log(compareValue);
  if (target === 'password') {
    console.log(validate({ password: value }, constraints));
  }
  if (target === 'confirmPassword') {
    console.log(validate({ password: value, confirmPassword: compareValue }, constraints));
  }
  if (target === 'email') {
    console.log(validate({ from: value }, constraints));
  }
  if (target === 'room') {
    console.log(validate({ room: value }, constraints));
  }
}

export default validator;