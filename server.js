const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser')


//configure Express
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world")
})


//MongoDB connection
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, {useNewURLParser: true})
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log(err))

//Server Connection
PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server is running on port ${PORT}`)
})