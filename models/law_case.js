const mongoose = require('mongoose')


const LawcaseSchema = new mongoose.Schema({
    customer : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },

    opponent : {
        type: String,
        required: true,
        ref: 'Customer'
    },

    customerStatus : {
        type: String,
        required: true
    },

    caseType : {
        type: String,
        required: true
    },

    court : {
        type: String,
        required: true
        
    },


})



module.exports = mongoose.model('Lawcase', LawcaseSchema)