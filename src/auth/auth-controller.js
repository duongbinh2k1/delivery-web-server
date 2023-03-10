const mongoose = require('mongoose');
const { userModel } = require("../user");
const { userRegisterValidate } = require("../user/user-validate")
const { genMail, jwtService } = require("../helpers")


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

      const userToken = await jwtService.signEmailToken({ user: req.body });

      const mailBody = genMail({
        email: req.body.email,
        link: `${process.env.SERVER_API_URL}/v1/auth/verify_email?email=${email || ""}&token=${userToken || ""}`,
      });

      await nodemailerService.sendMail(email, "Verify mail", mailBody);

      return res.status(200).json({ error_code: 0, message: "Open mail to verify account" })
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
      const refreshToken = req.query.refreshToken
      const { userId } = await jwtService.verifyRefreshToken(refreshToken);

      const user = await userModel.find({ _id: mongoose.Schema.Types.ObjectId(userId) })

      if (!user) {
        return res.status(400).json({ error_code: 101, message: "Invalid input" });
      }

      const accessToken = await jwtService.signAccessToken(userId);
      const newRefreshToken = await jwtService.signRefreshToken(userId);

      return res.status(200).json({
        error_code: 0,
        message: "Refresh token successfully",
        data: {
          access_token: accessToken,
          refresh_token: newRefreshToken,
        },
      });
    } catch (error) {
      return res.status(400).json({ error_code: 100, message: "Invalid input!" });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email, token } = req.query;
      const payload = await jwtService.verifyEmailToken(token);

      const newUser = payload.user;
      if (newUser.email === email) {
        const user = new userModel({
          username: newUser.username,
          fullName: newUser.fullName,
          email: newUser.email,
          password: newUser.password,
          inviteCode: newUser.inviteCode,
        });
        await user.save();

        return res.redirect(`${process.env.CLIENT_API_URL}/sign_in`);
      }
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input!" });
    }
  }
};

module.exports = authController;