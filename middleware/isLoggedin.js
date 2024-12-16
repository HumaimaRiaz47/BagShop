//  this middleware allows to access only the person who is login to the route,
// where this is called otherwise it will send it to the /route

const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model.js')

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        req.flash("error", "you need to login first")
        return res.redirect('/')
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await userModel.findOne({email: decoded.email}).select('-password')
        
        req.user = user

        next()
    } catch (error) {
        req.flash("error", "something went wrong")
        return res.redirect('/')
    }
}