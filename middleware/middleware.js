var express = require('express')
var app = express()
const Authentication = require('../model/AuthenticationModel')

var authenticate = async (req, res, next) => {
    console.log('Entering authentication')
    if (!req.headers.api_key) {
        res.status(400).send({
            status: 400,
            data: {},
            error: {
                msg: "Missing api_key in headers"
            }
        })
        return;
    }

    let token = req.headers.api_key
    console.log('api-key', token)

    // if token exist then returns the response
    let tokenResponse = await Authentication.findOne({
        token
    })
    if (tokenResponse) {
        console.log("token found")
        next()
    } else {
        res.status(401).send({
            status: 401,
            data: {},
            error: {
                msg: "Authentication error"
            }
        })
        return;
    }
}

module.exports = authenticate;