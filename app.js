const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended:true }));

// home page
app.get("/",(req,res)=>{
    res.render("home")
});

// login page
app.get("/login",(req,res)=>{
    res.render("login")
});

// register page
app.get("/register",(req,res)=>{
    res.render("register");
});



app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is Up and Running.");
});