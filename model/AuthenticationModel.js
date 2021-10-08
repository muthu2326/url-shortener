const mongoose = require('mongoose')

// instantiate a mongoose schema
const Authenticate = new mongoose.Schema({
    email: String,
    token: String,
    created: {
        type: String,
        default: Date.now
    },
    updated: {
        type: String,
        default: Date.now
    }
})

// create a model from schema and export it
module.exports = mongoose.model('api_keys', Authenticate)