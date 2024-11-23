const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fullname: {
        minLength: 3,
        type:String,
        trim: true,
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: [],
    },
    orders: {
        type: Array,
        default: [],
    },
    contact: Number,
    picture: String,

})

module.exports = mongoose.model("user", userSchema);