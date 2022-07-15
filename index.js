const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("./config/config.js");
const passport = require("passport");
require("./config/auth.js");

const app = express();
const port = 3000;


app.get("/", (req,res)=>{
    res.send('<a href="/auth/google">Authenticate with google </a>')
});

app.get("/auth/google", passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" }));

app.get("/google/callBack", passport.authenticate('google', { failureRedirect: '/auth/failure' }), 
    (req,res)=>{
    const payload = {
        //save here data
        check: true
    };
    const token = jwt.sign(payload, config.key, {
        expiresIn: "20m"
    });
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
    })
    res.send("Welcome! You are now authenticated with google!");
});


app.get('/auth/failure', (req, res) => {
    res.send('Something went wrong..')  
});



app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})