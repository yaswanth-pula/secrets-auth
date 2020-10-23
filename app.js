require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const md5 = require('md5');

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended:true }));

///////////  DB Setup ///////////////

// DB Name
const dbName = "userDB";

// DB URL
const dbConnectionUrl = "mongodb://localhost:27017/"+dbName; 

// Connect to DB
mongoose.connect(dbConnectionUrl, {useNewUrlParser:true, useUnifiedTopology:true});

// User Schema
const userSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
}); 

// User Model
const User = mongoose.model("User",userSchema);
 
// home page route
app.get("/",(req,res)=>{
    res.render("home")
});

// login page route
app.get("/login",(req,res)=>{
    res.render("login")
});

// register page route
app.get("/register",(req,res)=>{
    res.render("register");
});

// register post route - New User Registration
app.post("/register",(req,res)=>{
    const userEmail = req.body.username;
    const userPassword = md5(req.body.password);
    // new user
    const newUser = new User({
        email:userEmail,
        password:userPassword
    });
    // save new user into DB
    newUser.save((err)=>{
        if(err) console.log(err);
        else res.render("secrets");
    });
});

// login post route - User Login
app.post("/login",(req,res)=>{
    const userEmail = req.body.username;
    const userPassword = md5(req.body.password);
    // check for the user in DB
    User.findOne({email:userEmail},(err,resultUser)=>{
        if(err) console.log(err)
        else{
            if(resultUser){ 
                if(resultUser.password === userPassword)
                    res.render("secrets");
                else 
                    res.redirect("/login"); 
            }
        }
    })
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is Up and Running.");
});