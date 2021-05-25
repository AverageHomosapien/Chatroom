// importing modules
const express = require('express');
const router = express.Router();

// importing User Schema
const User = require('../model/user');

router.post('/login', function(req, res) {
    Users=new User({email: req.body.email, username : req.body.username});
          User.register(Users, req.body.password, function(err, user) {
            if (err) {
              res.json({success:false, message:"Your account could
              not be saved. Error: ", err})
            }else{
              res.json({success: true, message: "Your account has
               been saved"})
            }
          });
});
/*
router.get('/', function(req, res)){
    res.render("index");
}

router.get('/room', function(req, res)){
    res.render("room");
}*/

// Index page
router.get('/', function (req, res){
  console.log("Attempting to render index");
  res.render("index");
});

// Room page
router.get('/room', isLoggedIn, function (req, res){
  console.log("Attempting to render room");
  res.render("room");
});
