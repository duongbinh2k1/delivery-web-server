const { userModel } = require("../user");

const authController = {
  register: async (req, res) => {
    try {
      console.log('Register')
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