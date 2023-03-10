const mongoose = require('mongoose')
const  userValidate = require('./user-validate')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: userValidate.mailMaxLength,
  },
  password: {
    type: String,
    required: true,
    max: userValidate.passwordMaxLength,
  }
})

module.export = mongoose.model("User", userSchema);