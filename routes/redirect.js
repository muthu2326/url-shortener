const express = require('express')

const router = express.Router()

const Url = require('../model/UrlModel')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * @route    GET /:code
 * @description   Redirect to the original URL
 */

router.get('/:code', async (req, res) => {
    if (!req.params.code) {
        res.status(400).send({
            status: 400,
            data: {},
            error: {
                msg: "Missing short url in params"
            }
        })
        return;
    }

    try {
        // find a document match to the code in req.params.code
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            // when valid we perform a redirect
            return res.redirect(url.longUrl)
        } else {
            // else return a not found 404 status
            return res.status(404).send({
                status: 404,
                data: {},
                error: {
                    msg: "No URL found"
                }
            })
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).send({
            status: 500,
            data: {},
            error: {
                msg: "Internal Server error"
            }
        })
    }
})

module.exports = router