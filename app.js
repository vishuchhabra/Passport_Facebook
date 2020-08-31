require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan')
const session = require('express-session')


//My auth routes
const authRoutes = require("./auth");

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;


//DB Connection
mongoose
  .connect('mongodb://localhost:27017/passport_facebook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors());
app.use(morgan('dev'))

app.use(session({ secret: "cats" }));

//use the passport middleware
app.use(passport.initialize())
app.use(passport.session());
//passport library facebook  stratgey
passport.use(new FacebookStrategy({
    clientID: ""    ,
    clientSecret: "",
    callbackURL: "http://localhost:4000/auth/facebook/callback",
    profileFields   : ['id','displayName','name','gender','picture.type(large)','email']

  },
  function(accessToken, refreshToken, profile, done) {
      
      const user = profile
      done(null, user);
    
  }
));

//Serialisers
passport.serializeUser(function(user, done) {

    //it will  store into  the session 
    console.log("Testing serialize", user._json.id)
    done(null, user._json.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log("Testing Deserialize", id)
    
    //deserialze will  attach data to  req.user object
    return done(null,{name:"Vishu chhabra"})
});

//My Routes
app.use("/", authRoutes);


//PORT
const port = process.env.PORT || 4000;

//Starting a server
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});