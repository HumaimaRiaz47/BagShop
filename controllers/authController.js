const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {generateToken} = require('../utils/generateToken.js')



module.exports.registerUser = async function (req, res) {
    try {
      let { email, fullname, password } = req.body;
        
      let user = await userModel.findOne({email: email})
      if(user) return res.status(401).send("you already have an account, please login")

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
  }

module.exports.loginUser = async function(req, res){
    try {
        let { email, password } = req.body;
          
        let user = await userModel.findOne({email: email})
        if(!user) return res.send("email or password required")
        
        bcrypt.compare(password, user.password, function(err, result){
            if(result){
                let token = generateToken(user)
                res.cookie(token)
                res.send("you are login")
            }else{
                return res.send("email or password incorrect")
            }
        })



        } catch{
            
        }

        
    
             
}