const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path:"config.env"})

const app = express()

const PORT = process.env.PORT || 8000

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`App is running on port: ${PORT}`)
})