const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { userVariables } = require('./user-validate')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: userVariables.minUsernameLength,
      max: userVariables.maxUsernameLength,
    },
    fullName: {
      type: String,
      required: true,
      min: userVariables.minFullNameLength,
      max: userVariables.maxFullNameLength,
    },
    email: {
      type: String,
      required: true,
      max: userVariables.maxMailLength,
    },
    password: {
      type: String,
      required: true,
      min: userVariables.minPasswordLength,
      max: userVariables.maxPasswordLength,
    },
    inviteCode: {
      type: String,
      required: false,
      length: userVariables.inviteCodeLength,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {}
};

module.export = mongoose.model("User", userSchema);