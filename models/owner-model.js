const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: [],
    },
    picture: String,
    gstint: Number,

})

module.exports = mongoose.model("owner", ownerSchema);