const mongoose = require('mongoose')
const Contact = mongoose.model('Contact',{
    name: {
        type: String,
        required:true
    },
    phonenumber: {
        type:Number,
        required:true
    },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
})
module.exports = Contact;