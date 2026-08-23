const express = require('express')
const { router } = require('./routers/products')

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

const app = express()

const user = {
    id: '1'
}

app.use('/', (request, response, next) => {
    if (request.headers.token !== user.id) {
        return next({
            status: 401,
            message: 'unauthorized.....'
        })
    }
    request.hila = user.id
    next()
})

app.get('/health', (request, response, next) => {
    response.send(`healthy for user id ${request.hila}`)
    next()
})

// app.get('/products', (request, response, next) => {
//     response.json(products)
// })
// app.post('/products', (request, response, next) => {
//     response.status(201).send('saved product...')
// })
app.use('/products', router)

app.use((request, response, next) => {
    response.status(404).send('not found.....')
})

// logging the error
app.use((err, request, response, next) => {
    console.log(err)
    next(err)
})

// responding error ro user
app.use((err, request, response, next) => {
    response.status(err.status || 500).send(err.message || 'interbal error')
})

app.listen(3000, () => {
    console.log('express server started...')
})