// packages needed in this file

var express = require('express');
var router = express.Router();
const validUrl = require('valid-url')
var shortURL = require('node-url-shortener');
const shortid = require('shortid')
const suid = require('rand-token').suid

// import the Url database model
const Url = require('../model/UrlModel')
const Authentication = require('../model/AuthenticationModel')
const authenticate = require('../middleware/middleware')

// Base URL used to append after the original URL is converted to shorten URL
const baseUrl = require('../config/development').baseUrl

/**
 * @route    POST /api/url/shorten
 * @description     To create API KEY for the user
 */

router.post('/generate/api-key', async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            status: 400,
            data: {},
            error: {
                msg: "Missing email"
            }
        })
        return;
    }

    const email = req.body.email
    const token = suid(16)
    tokenObj = new Authentication({
        email: email,
        token: token
    })
    await tokenObj.save()
    res.status(200).send({
        status: 200,
        data: {
            api_key: tokenObj.token
        },
        error: {}
    })
})

/**
 * @route    POST /api/url/shorten
 * @description     Create short URL
 */

router.post('/url/shorten', authenticate, async (req, res) => {

    if (!req.body.longUrl) {
        res.status(400).send({
            status: 400,
            data: {},
            error: {
                msg: "Missing long url"
            }
        })
        return;
    }

    let longUrl = req.body.longUrl

    // check long url if valid using the validUrl.isUri method
    if (validUrl.isUri(longUrl)) {

        const urlCode = shortid.generate()
        console.log(urlCode);
        try {
            let url = await Url.findOne({
                longUrl
            })

            // url exist and return the respose
            if (url) {
                console.log()
                res.json({
                    status: 200,
                    data: {
                        shortUrl: url.shortUrl
                    },
                    error: {}
                })
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                })
                await url.save()
                
                res.status(200).send({
                    status: 200,
                    data: {
                        shortUrl: url.shortUrl
                    },
                    error: {}
                })
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).send({
                status: 500,
                data: {},
                error: {
                    msg: "Internal Server error"
                }
            })
        }
    } else {
        res.status(400).json({
            status: 400,
            data: {},
            error: {
                msg: "Invalid long url"
            }
        })
    }
})

module.exports = router;
