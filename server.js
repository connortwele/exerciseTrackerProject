const express = require('express')
const cors = require('cors')
//cors = cross origin resource sharing
const mongoose = require('mongoose')

//allows us to have environment variables in the .env file
require('dotenv').config();

const app = express();
const port = process.env.port || 5000

app.use(cors())
app.use(express.json())

//end middleware ^

const uri = process.env.ATLAS_URI
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('mongoDB database established successfully')
})

//start routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')

app.use('/exercises',exercisesRouter)
app.use('/users', usersRouter)
app.use(express.static('client/build'));

//end routes

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`)
})