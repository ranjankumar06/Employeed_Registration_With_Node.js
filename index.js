const express=require('express');
const app=express()
app.use(express.json())
require('dotenv').config(`${__dirname}/.env`)

app.use('/u',require('./routes/signup'))
app.use('/l',require('./routes/login'))

app.listen(2025,()=>{
    console.log('server working');
})















