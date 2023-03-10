const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const dbConnection = require('./src/helpers/db-connection')

const { userRoute } = require("./src/user")
const { authRoute } = require("./src/auth")

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", parameterLimit: 50000, extended: true }));

const PORT = process.env.PORT || 8080

app.use("/users", userRoute)
app.use("/auth", authRoute)


// Connect db
dbConnection.connectMongoDB()

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`)
})