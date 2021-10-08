var express = require('express')
var app = express()
const Authentication = require('../model/AuthenticationModel')

var authenticate = async (req, res, next) => {
    console.log('Entering authentication')
    let token = req.headers.Authorization
    let tokenResponse = await Authentication.findOne({
        token
    })

    // if token exist then returns the respose
    if (tokenResponse) {
        console.log("token found")
        next()
    }else{
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