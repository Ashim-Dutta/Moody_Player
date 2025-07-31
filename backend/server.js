require('dotenv').config()
const express = require("express");
const app = require('./src/app')
const connectDB = require('./src/db/db')
const path = require("path");


app.use(express.static(path.join(__dirname, "../frontend/dist"))); 
connectDB()
app.listen(3000, () => { 
    console.log("server is running on port");
})