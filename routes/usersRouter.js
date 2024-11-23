const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')

router.get("/", (req, res) => {
    res.send("hey its working")
})

router.post("/register", (req, res) => {
    try{

        let {email, fullname, password} = req.body;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err){
                    return res.send(err.message)
                }else{
                    let user = userModel.create({
                        email, 
                        fullname,
                        password: hash,
                    })
                    res.send(res)
                }
            })
        })

  

    }catch(err){
        res.send(err.message)
    }

})


module.exports = router;