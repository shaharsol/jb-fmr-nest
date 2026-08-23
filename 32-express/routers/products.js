const express = require('express')

const products = [{
    id: 1,
    name: 'iphone'
}, {
    id: 2,
    name: 'Samsung galaxy'
}, {
    id: 3,
    name: 'Shiomi phone'
}]

const router = express.Router()
router.get('/', (request, response, next) => {
    response.json(products)
})
router.post('/', (request, response, next) => {
    response.status(201).send('saved product...')
})

module.exports = {
    router
}