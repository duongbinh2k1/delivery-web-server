const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')

const { userRoute } = require("./src/user")
const { authRoute } = require("./src/auth")

const app = express();

const PORT = process.env.PORT || 8080

app.use("/users", userRoute)
app.use("/auth", authRoute)

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`)
})