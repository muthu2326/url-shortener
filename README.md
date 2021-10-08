# Node-URL-Shortener-Service

A URL shortener service where a long url can be converted to a shorter form 

Also when the shorter url is used it will redirect to the original url

## Pre-requisites
* Node JS Version - v14.XX.XX
* NPM - 6.XX.XX
* Express JS Version - 4.16.1
* MongoDB

## Run

npm install

## npm run devStart

nodemon npm start


## API Specifications

1. Generate API Key - This api is used to generate an api-key that can be used to authenticate the url shortener service API

* Method: POST
* Route: {{base-url}}/api/generate/api-key
* Request Payload: email
* Response: API-KEY

2. URL Shortener API - This api is used convert to the long url to a shorter form

* Method: POST
* Route: {{base-url}}/api/url/shorten
* Headers: Authorization - API-KEY
* Request Payload: longUrl
* Response: shortUrl