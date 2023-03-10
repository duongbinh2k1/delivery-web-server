const { userModel } = require("../user");
const { userRegisterValidate } = require("../user/user-validate")

const authController = {
  register: async (req, res) => {
    try {
      console.log('Register')
      const { error } = userRegisterValidate(req.body)
      if (error) {
        return res.status(400).json({ error_code: 100, message: "Invalid input!"})
      }  
      const { username, email } = req.body

      const isExits = await userModel.find({
        $or: [
          {
            username: username,
          },
          {
            email: email
          }
        ]
      })
      if (isExits) {
        return res.status(409).json({ error_code: 101, message: "Duplicate username or email" });
      }

      const user = new userModel({
        username: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        // inviteCode: req.body.inviteCode
      });
      await user.save();

      return res.status(201).json({ error_code: 0, message: "Register successfully!" })
    } catch (error) {
      return res.status(400).json({ error_code: 100, message: "Invalid input!" });
    }
  },

  login: async (req, res) => {
    try {
      console.log('Login')
    } catch (error) {
      return res.status(400).json({ error_code: 100, message: "Invalid input!" });
    }
  },

  refresh: async (req, res) => { 
    try {
      console.log('Refresh')
    } catch (error) {
      return res.status(400).json({ error_code: 100, message: "Invalid input!" });
    }
  }
};

module.exports = authController;