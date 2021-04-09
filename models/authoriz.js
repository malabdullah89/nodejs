const mongoose = require('mongoose')

const AuthorizSchema = new mongoose.Schema ({
    customer : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },

    authorizdate : {
        type: String,
        required: true,
       
    },

    authorizImage : {
        type: Buffer,
        required: true,
    },

    authorizImageType: {
        type: String,
        required: true

    },

})

AuthorizSchema.virtual('authorizImagePath').get(function() {
    if (this.authorizImage != null && this.authorizImageType != null) {
      return `data:${this.authorizImageType};charset=utf-8;base64,${this.authorizImage.toString('base64')}`
    }
  })

module.exports = mongoose.model('Authoriz', AuthorizSchema)