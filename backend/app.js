const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv').config()

const connectToDatabase = require('./database/index.js');
connectToDatabase();
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const { promisify } = require("util");
const userRoute = require("./routes/userRoute.js")

app.use(cookies())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//routes
app.use("/user",userRoute);

app.get("/",(req,res)=>{
    res.send("WELCOME");
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const server = app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})