const mongoose = require('mongoose')


const CustomerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },

    civialIDNumber : {
        type: Number,
        required: true
    },

    phoneNumber : {
        type: Number,
        required: true
    },

    email : {
        type: String,
        
    },

})

module.exports = mongoose.model('Customer', CustomerSchema)