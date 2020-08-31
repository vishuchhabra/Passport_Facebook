const express = require('express')
const Router = express.Router()
const  passport = require('passport')


//final api 

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
Router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
Router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'http://localhost:4000/success/',
                                      failureRedirect:'http://localhost:4000/login/'}));

//dashboard api                                      
Router.get('/success',(req,res)=>{
    //getting id from  the passport session
    console.log("ID here",req.session.passport.user)
    //we can access result  of deserailize at req.user
    console.log("Deserialize result",req.user)
    res.send("Login successfuly")
})

//login api                                      
Router.get('/login',(req,res)=>{
    res.send("Login here")
})






//exporting the module
module.exports = Router