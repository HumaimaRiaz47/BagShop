const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {generateToken} = require('../utils/generateToken.js')

router.get("/", (req, res) => {
  res.send("hey its working");
});

router.post("/register", (req, res) => {
  try {
    let { email, fullname, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.send(err.message);
        } else {
          let user = userModel.create({
            email,
            fullname,
            password: hash,
          });

          // Generate a JSON Web Token (JWT) using the user's email and ID
          let token = generateToken(user)

          // Set the token as a cookie in the response
          res.cookie("token", token);

          
          res.send("user created successfully");

        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
