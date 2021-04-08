const mongoose = require('mongoose')

const CourthearingSchema = new mongoose.Schema({
    lawcase : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Lawcase'
    },

    courtdate : {
        type: String,
        
        
    },

    room : {
        type: String,
    },



})


module.exports = mongoose.model('Courthearing', CourthearingSchema)

