const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')

dotenv.config({path:"config.env"})
mongoose.connect(process.env.DB_URI)

const app = express()

const PORT = process.env.PORT || 8000

if(process.env.NODE_ENV == 'Development'){
    app.use(morgan('dev'))
    console.log(`Mode: ${process.env.NODE_ENV}`)
}

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`App is running on port: ${PORT}`)
})