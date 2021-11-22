const express = require('express')
const dotenv = require('dotenv')
const app = express()
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')

dotenv.config();

app.use(express.json())

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(console.log('Connected to Database'))
.catch((err) => console.log(err))


app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.listen(3002, ()  => {
    console.log('Server Runing');
})