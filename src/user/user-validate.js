const Joi = require('joi');

const userVariables = {
  minUsernameLength: 6,
  maxUsernameLength: 20,
  minFullNameLength: 6,
  maxFullNameLength: 50,
  maxMailLength: 50,
  minPasswordLength: 8,
  maxPasswordLength: 50,
  inviteCodeLength: 8,
};

const userRegisterValidate = data => {
  const userSchema = Joi.object({
    username: Joi.string().required().min(userVariables.minUsernameLength).max(userVariables.maxUsernameLength),
    fullName: Joi.string().required().min(userVariables.minFullNameLength).max(userVariables.maxFullNameLength),
    email: Joi.string().email().required().max(userVariables.maxMailLength),
    password: Joi.string().required().min(userVariables.minPasswordLength).max(userVariables.maxPasswordLength),
    // inviteCode: Joi.string().required().length(userVariables.inviteCodeLength)
  });
  return userSchema.validate(data);
}

module.exports = {
  userVariables,
  userRegisterValidate,
};
